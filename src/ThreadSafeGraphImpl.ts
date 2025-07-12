import { Edge } from "./Edge";
import { Vertex } from './Vertex';
import { Path } from "./Path";
import { PriorityQueue } from './PriorityQueue';

export class ThreadSafeGraphImpl {
    private edges: Edge[];
    private vertices: Vertex[];
    private vertexMap: Map<string, Vertex>;
    protected readWriteLock: ReadWriteLock;

    constructor() {
        this.edges = [];
        this.vertices = [];
        this.vertexMap = new Map<string, Vertex>();
        this.readWriteLock = new ReadWriteLock();
    }

    public async bellmanFord(src: Vertex): Promise<Map<Vertex, number>> {
        return this.readWriteLock.withReadLock(async () => {
            return this.bellmanFordInternal(src);
        });
    }

    protected bellmanFordInternal(src: Vertex): Map<Vertex, number> {
        var vDists = new Map<Vertex, number>();
        
        this.vertices.forEach((v) => {
            vDists.set(v, Number.MAX_VALUE);
        });

        vDists.set(src, 0);

        for (var i = 0; i < this.vertices.length; i++) {
            for (var j = 0; j < this.edges.length; j++) {
                var start = this.edges[j].start;
                var end = this.edges[j].end;
                var cost = this.edges[j].getCost();

                var startCost = vDists.get(start)!;
                var newCost = startCost + cost;
                
                if (newCost < vDists.get(end)!) {
                    vDists.set(end, newCost);
                    end.prev = this.edges[j];
                    this.edges[j].prev = start;
                }
            }
        }

        return vDists;
    }

    public async dijkstra_shortestPath(src: Vertex, dest: Vertex): Promise<Path> {
        return this.readWriteLock.withReadLock(async () => {
            return this.dijkstraInternal(src, dest);
        });
    }

    protected dijkstraInternal(src: Vertex, dest: Vertex): Path {
        var path = new Path();
        var vDists = new Map<string, number>();
        var visited = new Set<string>();
        var pq = new PriorityQueue<Vertex>();

        this.vertices.forEach((v) => {
            vDists.set(v.label, Number.MAX_VALUE);
        });

        vDists.set(src.label, 0);
        pq.enqueue(src, 0);

        while (!pq.isEmpty()) {
            var currentVertex = pq.dequeue()!;

            if (visited.has(currentVertex.label)) continue;
            visited.add(currentVertex.label);

            if (currentVertex === dest) break;

            var incidentEdges = this.getIncidentStartEdges(currentVertex);

            incidentEdges.forEach((edge) => {
                var neighbor = edge.end;
                var currentCost = vDists.get(currentVertex.label)!;
                var newCost = currentCost + edge.getCost();

                if (newCost < vDists.get(neighbor.label)!) {
                    vDists.set(neighbor.label, newCost);
                    neighbor.prev = edge;
                    edge.prev = currentVertex;
                    pq.enqueue(neighbor, newCost);
                }
            });
        }

        if (dest.prev == undefined) {
            console.log("No path found to destination");
            return path;
        }

        var step: Vertex | Edge | undefined = dest;
        path.addStep(step);
        while (step != undefined) {
            step = step.getPrev()!;
            if (step instanceof Vertex)
                path.addStep(step!);
            if (step instanceof Edge)
                path.addStep(step!);
        }

        path.reverse();
        return path;
    }

    public async insertVertex(o: any): Promise<Vertex> {
        return this.readWriteLock.withWriteLock(async () => {
            return this.insertVertexInternal(o);
        });
    }

    protected insertVertexInternal(o: any): Vertex {
        var v: Vertex;
        if (this.isOfTypeVertex(o)) {
            v = o;
        } else {
            v = new Vertex(o);
        }
        
        this.vertices.push(v);
        this.vertexMap.set(v.label, v);
        return v;
    }

    public async insertEdge(v: Vertex, w: Vertex, o: any): Promise<Edge> {
        return this.readWriteLock.withWriteLock(async () => {
            return this.insertEdgeInternal(v, w, o);
        });
    }

    protected insertEdgeInternal(v: Vertex, w: Vertex, o: any): Edge {
        var e = new Edge(v, w);
        if (typeof o === 'number') {
            e.setCost(o);
        } else {
            e.obj = o;
        }

        this.edges.push(e);
        return e;
    }

    public async removeVertex(v: Vertex): Promise<void> {
        return this.readWriteLock.withWriteLock(async () => {
            return this.removeVertexInternal(v);
        });
    }

    protected removeVertexInternal(v: Vertex): void {
        var edges = this.getIncidentEdges(v);
        for (var i = 0; i < edges.length; i++) {
            this.removeEdgeInternal(edges[i]);
        }

        var i = this.vertices.indexOf(v);
        if (i !== -1) {
            this.vertices.splice(i, 1);
            this.vertexMap.delete(v.label);
        }
    }

    public async removeEdge(e: Edge): Promise<void> {
        return this.readWriteLock.withWriteLock(async () => {
            return this.removeEdgeInternal(e);
        });
    }

    protected removeEdgeInternal(e: Edge): void {
        for (var i = 0; i < this.edges.length; i++) {
            if (this.edges[i] === e) {
                this.edges.splice(i, 1);
                break;
            }
        }
    }

    public async getVertexByLabel(label: string): Promise<Vertex | undefined> {
        return this.readWriteLock.withReadLock(async () => {
            return this.vertexMap.get(label);
        });
    }

    // Synchronous methods for internal use and backward compatibility
    public getAllVertices(): Vertex[] {
        return [...this.vertices];
    }

    public getAllEdges(): Edge[] {
        return [...this.edges];
    }

    public getIncidentEdges(v: Vertex): Edge[] {
        var incidentEdges: Edge[] = [];
        this.edges.forEach((edge) => {
            if (edge.end === v || edge.start === v) {
                if (!incidentEdges.includes(edge)) {
                    incidentEdges.push(edge);
                }
            }
        });
        return incidentEdges;
    }

    public getIncidentStartEdges(v: Vertex): Edge[] {
        var incidentEdges: Edge[] = [];
        this.edges.forEach((edge) => {
            if (edge.start === v) {
                if (!incidentEdges.includes(edge)) {
                    incidentEdges.push(edge);
                }
            }
        });
        return incidentEdges;
    }

    public getIncidentEndEdges(v: Vertex): Edge[] {
        var incidentEdges: Edge[] = [];
        this.edges.forEach((edge) => {
            if (edge.end === v) {
                if (!incidentEdges.includes(edge)) {
                    incidentEdges.push(edge);
                }
            }
        });
        return incidentEdges;
    }

    public getOpposite(v: Vertex, e: Edge): Vertex | undefined {
        if (e.start === v) return e.end;
        else if (e.end === v) return e.start;
        else return undefined;
    }

    public getVertices(e: Edge): Vertex[] {
        return [e.start, e.end];
    }

    public getAdjacentVertices(v: Vertex): Vertex[] {
        var edges = this.getIncidentEdges(v);
        var neighbors: Vertex[] = [];

        edges.forEach((e) => {
            var opp = this.getOpposite(v, e);
            if (opp != undefined && !neighbors.includes(opp)) {
                neighbors.push(opp);
            }
        });

        return neighbors;
    }

    public areAdjacent(v: Vertex, w: Vertex): boolean {
        return this.edges.some(e => 
            (e.start === v && e.end === w) || 
            (e.start === w && e.end === v)
        );
    }

    public isOfTypeVertex(input: any): boolean {
        return input instanceof Vertex;
    }
}

class ReadWriteLock {
    private readers: number = 0;
    private writers: number = 0;
    private readQueue: (() => void)[] = [];
    private writeQueue: (() => void)[] = [];

    public async withReadLock<T>(fn: () => Promise<T> | T): Promise<T> {
        await this.acquireReadLock();
        try {
            return await fn();
        } finally {
            this.releaseReadLock();
        }
    }

    public async withWriteLock<T>(fn: () => Promise<T> | T): Promise<T> {
        await this.acquireWriteLock();
        try {
            return await fn();
        } finally {
            this.releaseWriteLock();
        }
    }

    private async acquireReadLock(): Promise<void> {
        return new Promise((resolve) => {
            if (this.writers === 0) {
                this.readers++;
                resolve();
            } else {
                this.readQueue.push(() => {
                    this.readers++;
                    resolve();
                });
            }
        });
    }

    private releaseReadLock(): void {
        this.readers--;
        if (this.readers === 0 && this.writeQueue.length > 0) {
            const nextWriter = this.writeQueue.shift()!;
            nextWriter();
        }
    }

    private async acquireWriteLock(): Promise<void> {
        return new Promise((resolve) => {
            if (this.readers === 0 && this.writers === 0) {
                this.writers++;
                resolve();
            } else {
                this.writeQueue.push(() => {
                    this.writers++;
                    resolve();
                });
            }
        });
    }

    private releaseWriteLock(): void {
        this.writers--;
        if (this.writeQueue.length > 0) {
            const nextWriter = this.writeQueue.shift()!;
            nextWriter();
        } else {
            while (this.readQueue.length > 0) {
                const nextReader = this.readQueue.shift()!;
                nextReader();
            }
        }
    }
}