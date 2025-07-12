import { Edge } from "./Edge";
import { Vertex } from './Vertex';
import { Path } from "./Path";
import { ThreadSafeGraphImpl } from './ThreadSafeGraphImpl';

export interface MarketUpdate {
    fromAsset: string;
    toAsset: string;
    price: number;
    timestamp: number;
    maxTradeSize?: number;
}

export interface EdgeMetadata {
    lastUpdated: number;
    maxAge: number; // milliseconds
    maxTradeSize?: number;
    source: string; // exchange name
}

export class RealTimeGraphImpl extends ThreadSafeGraphImpl {
    private edgeMetadata: Map<Edge, EdgeMetadata>;
    private edgeIndex: Map<string, Edge>; // "fromLabel->toLabel" -> Edge
    private updateQueue: MarketUpdate[];
    private batchSize: number;
    private batchTimeoutMs: number;
    private batchTimeout: NodeJS.Timeout | null = null;
    private isProcessingBatch: boolean = false;

    constructor(batchSize: number = 100, batchTimeoutMs: number = 10) {
        super();
        this.edgeMetadata = new Map();
        this.edgeIndex = new Map();
        this.updateQueue = [];
        this.batchSize = batchSize;
        this.batchTimeoutMs = batchTimeoutMs;
    }

    public async addMarketUpdate(update: MarketUpdate): Promise<void> {
        this.updateQueue.push(update);
        
        if (this.updateQueue.length >= this.batchSize) {
            await this.processBatch();
        } else if (!this.batchTimeout) {
            this.batchTimeout = setTimeout(() => this.processBatch(), this.batchTimeoutMs);
        }
    }

    public async addMarketUpdates(updates: MarketUpdate[]): Promise<void> {
        this.updateQueue.push(...updates);
        
        if (this.updateQueue.length >= this.batchSize) {
            await this.processBatch();
        } else if (!this.batchTimeout) {
            this.batchTimeout = setTimeout(() => this.processBatch(), this.batchTimeoutMs);
        }
    }

    private async processBatch(): Promise<void> {
        if (this.isProcessingBatch || this.updateQueue.length === 0) {
            return;
        }

        this.isProcessingBatch = true;
        
        if (this.batchTimeout) {
            clearTimeout(this.batchTimeout);
            this.batchTimeout = null;
        }

        const batch = this.updateQueue.splice(0, this.batchSize);
        
        try {
            await this.applyUpdates(batch);
        } catch (error) {
            console.error('Error processing market updates:', error);
        } finally {
            this.isProcessingBatch = false;
        }

        // Process remaining updates if any
        if (this.updateQueue.length > 0) {
            setTimeout(() => this.processBatch(), 0);
        }
    }

    private async applyUpdates(updates: MarketUpdate[]): Promise<void> {
        return this.readWriteLock.withWriteLock(async () => {
            for (const update of updates) {
                await this.applyUpdateInternal(update);
            }
        });
    }

    private async applyUpdateInternal(update: MarketUpdate): Promise<void> {
        const edgeKey = `${update.fromAsset}->${update.toAsset}`;
        let edge = this.edgeIndex.get(edgeKey);

        if (!edge) {
            // Create vertices if they don't exist
            let fromVertex = await this.getVertexByLabel(update.fromAsset);
            if (!fromVertex) {
                fromVertex = await this.insertVertex(update.fromAsset);
            }

            let toVertex = await this.getVertexByLabel(update.toAsset);
            if (!toVertex) {
                toVertex = await this.insertVertex(update.toAsset);
            }

            // Create new edge
            edge = await this.insertEdge(fromVertex, toVertex, update.price);
            this.edgeIndex.set(edgeKey, edge);
        } else {
            // Update existing edge
            edge.setCost(update.price);
        }

        // Update metadata
        this.edgeMetadata.set(edge, {
            lastUpdated: update.timestamp,
            maxAge: 30000, // 30 seconds default
            maxTradeSize: update.maxTradeSize,
            source: 'market'
        });
    }

    public async getArbitrageOpportunities(maxAge: number = 30000): Promise<Path[]> {
        return this.readWriteLock.withReadLock(async () => {
            this.cleanStaleEdges(maxAge);
            return this.findNegativeCycles();
        });
    }

    private cleanStaleEdges(maxAge: number): void {
        const now = Date.now();
        const staleEdges: Edge[] = [];

        this.edgeMetadata.forEach((metadata, edge) => {
            if (now - metadata.lastUpdated > maxAge) {
                staleEdges.push(edge);
            }
        });

        staleEdges.forEach(edge => {
            this.removeEdgeInternal(edge);
            this.edgeMetadata.delete(edge);
            
            // Remove from index
            const edgeKey = `${edge.start.label}->${edge.end.label}`;
            this.edgeIndex.delete(edgeKey);
        });
    }

    private findNegativeCycles(): Path[] {
        const cycles: Path[] = [];
        
        if (this.getAllVertices().length === 0) {
            return cycles;
        }

        const distances = this.bellmanFordInternal(this.getAllVertices()[0]);

        // Check for negative cycles
        for (const edge of this.getAllEdges()) {
            const startDist = distances.get(edge.start);
            const endDist = distances.get(edge.end);
            
            if (startDist && endDist) {
                const newDist = startDist + edge.getCost();
                if (newDist < endDist) {
                    // Found negative cycle
                    const cycle = this.buildCycleFrom(edge);
                    if (cycle && cycle.steps.length > 0) {
                        cycles.push(cycle);
                    }
                }
            }
        }

        return cycles;
    }

    private buildCycleFrom(edge: Edge): Path | null {
        const path = new Path();
        const visited = new Set<string>();
        
        let current: Vertex | Edge | undefined = edge.start;
        
        while (current && !visited.has(this.getNodeKey(current))) {
            visited.add(this.getNodeKey(current));
            path.addStep(current);
            current = current.getPrev();
        }

        return path.steps.length > 0 ? path : null;
    }

    private getNodeKey(node: Vertex | Edge): string {
        if (node instanceof Vertex) {
            return `v:${node.label}`;
        } else {
            return `e:${node.start.label}->${node.end.label}`;
        }
    }

    public async getOptimalPath(
        from: string, 
        to: string, 
        maxAge: number = 30000
    ): Promise<Path | null> {
        return this.readWriteLock.withReadLock(async () => {
            this.cleanStaleEdges(maxAge);
            
            const fromVertex = await this.getVertexByLabel(from);
            const toVertex = await this.getVertexByLabel(to);
            
            if (!fromVertex || !toVertex) {
                return null;
            }

            return this.dijkstraInternal(fromVertex, toVertex);
        });
    }

    public async getEdgeMetadata(edge: Edge): Promise<EdgeMetadata | undefined> {
        return this.edgeMetadata.get(edge);
    }

    public async validateTradeSize(path: Path, tradeSize: number): Promise<boolean> {
        for (const step of path.steps) {
            if (step instanceof Edge) {
                const metadata = this.edgeMetadata.get(step);
                if (metadata?.maxTradeSize && tradeSize > metadata.maxTradeSize) {
                    return false;
                }
            }
        }
        return true;
    }

    public getStatistics(): {
        totalVertices: number;
        totalEdges: number;
        queueSize: number;
        isProcessing: boolean;
    } {
        return {
            totalVertices: this.getAllVertices().length,
            totalEdges: this.getAllEdges().length,
            queueSize: this.updateQueue.length,
            isProcessing: this.isProcessingBatch
        };
    }

    public async destroy(): Promise<void> {
        if (this.batchTimeout) {
            clearTimeout(this.batchTimeout);
            this.batchTimeout = null;
        }
        
        this.updateQueue = [];
        this.edgeMetadata.clear();
        this.edgeIndex.clear();
    }
}