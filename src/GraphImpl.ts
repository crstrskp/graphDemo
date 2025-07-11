import { Edge } from "./Edge";
import { IGraph } from "./IGraph";
import { Vertex } from './Vertex';
import { IGraphSearch } from "./IGraphSearch";
import { Path } from "./Path";
import { IPathBuilder } from './IPathBuilder';
import { PriorityQueue } from './PriorityQueue';

export class GraphImpl implements IGraph, IGraphSearch, IPathBuilder
{
    edges : Edge[];
    vertices : Vertex[];
    private vertexMap : Map<string, Vertex>;
    
    constructor() {
        this.edges = [];
        this.vertices = [];
        this.vertexMap = new Map<string, Vertex>();
    }

    public bellmanFord(src : Vertex) {
        var vDists = new Map<Vertex, number>();
        
        this.vertices.forEach((v) => {
            vDists.set(v, Number.MAX_VALUE);
        });

        vDists.set(src, 0);


        for (var i = 0; i < this.vertices.length; i++)
        {
            for (var j = 0; j < this.edges.length; j++)
            {
                var start   = this.edges[j].start;
                var end     = this.edges[j].end;
                var cost    = this.edges[j].getCost();

                var startCost = vDists.get(start)!; 
                var newCost = startCost + cost;
              
                if (newCost < vDists.get(end)!)
                {
                    vDists.set(end, newCost);
                    end.prev = this.edges[j];
                    this.edges[j].prev = start; 
                }
            }
        }

        return vDists;
    }

    public bellmanFord_shortestPath(src : Vertex, dest : Vertex) : Path
    {
        var path = new Path(); 
        path.addStep(dest);

        var bmf = this.bellmanFord(src);

        // this.bmf_print(bmf);

        var step : Vertex|Edge|undefined = dest;
        while(step != undefined)
        {
            step = step.getPrev()!;
            path.addStep(step!);
        }
        path.reverse();
        
        path.next(); // delete me - removes the first "dest" node, however this shouldn't be done like this! 
        return path; 
    }

    public bmf_print(bmf: Map<Vertex, number>) 
    {
        var output = "Node\tDistance from source\n";

        bmf.forEach((value, key) => 
        {
            output += key.label + "\t\t" + value + "\n";
        });

        console.log(output);
    }

    public bmf_negativeCycles() 
    {
        var cycles : Path[] = [];

        var vDists = this.bellmanFord(this.vertices[0]);

        for (var j = 0; j < this.edges.length; j++)
        {
            var start = this.edges[j].start;
            var end = this.edges[j].end;
            var cost = this.edges[j].getCost();
            
            var c = vDists.get(start)! + cost;
            if (c < vDists.get(end)!)
            {
                // Found a negative cycle - construct the full cycle path
                var cycle = this.extractNegativeCycle(end);
                if (cycle && cycle.steps.length > 0) {
                    cycles.push(cycle);
                }
            }
        }

        return cycles;
    }

    private extractNegativeCycle(startVertex: Vertex): Path | null {
        var cycle = new Path();
        var current: Vertex | Edge | undefined = startVertex;

        // Walk backward V steps to ensure we're in the cycle
        for (var i = 0; i < this.vertices.length; i++) {
            if (!current) break;
            current = current.getPrev();
        }

        if (!current || !(current instanceof Vertex)) return null;

        // Now extract the actual cycle by following predecessors until we loop back
        var cycleStart = current;
        var pathSteps: (Vertex | Edge)[] = [];
        var visited = new Set<string>();

        do {
            if (current instanceof Vertex) {
                if (visited.has(current.label)) {
                    // Found the start of the cycle, break
                    break;
                }
                visited.add(current.label);
                pathSteps.push(current);
                
                if (current.prev) {
                    pathSteps.push(current.prev);
                    current = current.prev.start;
                } else {
                    break;
                }
            } else {
                break;
            }
        } while (current && pathSteps.length < this.vertices.length * 3);

        // Add the cycle back to the path in correct order
        for (var i = pathSteps.length - 1; i >= 0; i--) {
            cycle.addStep(pathSteps[i]);
        }

        return cycle.steps.length > 0 ? cycle : null;
    }
    
    public dijkstra_shortestPath(src: Vertex, dest: Vertex) : Path 
    {
        var path = new Path(); 
        
        var vDists = new Map<string, number>();
        var visited = new Set<string>();
        var pq = new PriorityQueue<Vertex>();

        this.vertices.forEach((v) => {
            vDists.set(v.label, Number.MAX_VALUE);
        });

        vDists.set(src.label, 0);
        pq.enqueue(src, 0);
        
        while(!pq.isEmpty())
        {
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

        if (dest.prev == undefined) 
        {
            console.log("we did not find a path leading to destination");
            return path;
        } 

        // console.log(vDists);

        // build path
        var step : Vertex|Edge|undefined = dest;
        path.addStep(step);
        while(step != undefined)
        {
            step = step.getPrev()!;
            if (step instanceof Vertex) 
                path.addStep(step!);

            if (step instanceof Edge) 
                path.addStep(step!);
        }

        path.reverse();
        // console.log(path.toString());
        return path;
    }
    
    public getVertexByLabel(label: string) : Vertex | undefined
    {
        return this.vertexMap.get(label);
    }

    public getAllVertices(): Vertex[] 
    { 
        var vertices : Vertex[] = [];
        for (var i = 0; i < this.vertices.length; i++) 
        {
            if (this.vertices[i] != null && this.vertices[i] != undefined)
            {
                vertices.push(this.vertices[i]);
            }
        }
        
        this.vertices = vertices;

        return this.vertices; 
    }
    
    public getAllEdges(): Edge[] 
    { 
        var edges : Edge[] = [];
        for (var i = 0; i < this.edges.length; i++)
        {   
            var e = this.edges[i];
            if (e != null && e != undefined)
            {
                edges.push(e);
            }
        }

        this.edges = edges; 
        return this.edges;
    }
    
    public getIncidentEdges(v: Vertex): Edge[]
    {
        var incidentEdges : Edge[] = [];

        this.edges.forEach((edge) => {
            if (edge.end === v || edge.start === v)
                if (incidentEdges.includes(edge) == false) 
                    incidentEdges.push(edge);
        });
        // console.log("incident edges for vertex {",v, "}:\n",incidentEdges);
        return incidentEdges;
    }

    public getIncidentStartEdges(v: Vertex): Edge[] 
    {
        var incidentEdges : Edge[] = [];

        this.edges.forEach((edge) => {
            if (edge.start === v)
                if (incidentEdges.includes(edge) == false) 
                    incidentEdges.push(edge);
        });

        return incidentEdges;    
    }

    public getIncidentEndEdges(v: Vertex): Edge[] 
    {
        var incidentEdges : Edge[] = [];

        this.edges.forEach((edge) => {
            if (edge.end === v)
                if (incidentEdges.includes(edge) == false) 
                    incidentEdges.push(edge);
        });

        return incidentEdges;
    }

    public getOpposite(v: Vertex, e: Edge): Vertex | undefined 
    {
        if (e.start === v) return e.end;
        else if (e.end === v) return e.start;
        else return undefined;
    }

    public getVertices(e: Edge): Vertex[] 
    {
        var vertices : Vertex[] = [];

        vertices.push(e.start!);
        vertices.push(e.end!);
        
        return vertices; 
    }

    public getAdjacentVertices(v: Vertex): Vertex[] 
    {
        var edges = this.getIncidentEdges(v);
        var neighbors : Vertex[] = []; 

        edges.forEach((e) => 
        {   
            var opp = this.getOpposite(v, e);
            if (opp != undefined && !neighbors.includes(opp))
                neighbors.push(opp);
        });

        return neighbors;
    }

    public areAdjacent(v: Vertex, w: Vertex): boolean 
    {
        var adj = false;

        for (var i = 0; i < this.edges.length; i++)
        {
            var e = this.edges[i];
            if (e.start === v && e.end === w) adj = true; 
            else if (e.start === w && e.end === v) adj = true; 
            else adj = false; 
        }

        return adj; 
    }

    public insertVertex(o: any): Vertex 
    {
        if (this.isOfTypeVertex(o))
        {
            this.vertices.push(o);
            this.vertexMap.set(o.label, o);
            return o;
        }
        else
        {
            var v = new Vertex(o);
            this.vertices.push(v);
            this.vertexMap.set(v.label, v);
            return v;
        }
    }

    public isOfTypeVertex(input: any): boolean
    {
        return input instanceof Vertex;
    }
    
    public insertEdge(v: Vertex, w: Vertex, o: any): Edge 
    {
        var e = new Edge(v, w);
        if (Number.isFinite(o))
        {
            e.setCost(o);
        } else {
            e.obj = o;
        }

        this.edges.push(e);
        return e; 
    }

    public removeVertex(v: Vertex)
    {
        var edges = this.getIncidentEdges(v);
        for (var i = 0; i < edges.length; i++)
        {
            this.removeEdge(edges[i]);
        }

        var i = this.vertices.indexOf(v);
        var removedElement = this.vertices.splice(i, 1);
        this.vertexMap.delete(v.label);
    }

    public removeEdge(e: Edge) 
    {
        for (var i = 0; i < this.edges.length; i++)
        {
            if (this.edges[i] === e)
                delete this.edges[i];
        }
        this.getAllEdges(); // updates the this.edges array
    }

    /**
     * 
     * @param edges list of edges to be sorted
     * @returns a new list of sorted edges
     */
    public sortEdgesASC(edges : Edge[]) : Edge[] 
    {
        var sortedArray : Edge[] = [];
        edges.forEach((e) => sortedArray.push(e));

        return sortedArray.sort((e1, e2) => 
        {
            if (e1.cost > e2.cost)
                return 1; 

            if (e1.cost < e2.cost)
                return -1; 

            return 0; 
        });
    }

    /**
     * 
     * @param edges list of edges to be sorted
     * @returns a new list of sorted edges
     */
    public sortEdgesDESC(edges : Edge[]) : Edge[] 
    {
        var sortedArray : Edge[] = [];
        edges.forEach((e) => sortedArray.push(e));

        return sortedArray.sort((e1, e2) => 
        {
            if (e1.cost < e2.cost)
                return 1; 

            if (e1.cost > e2.cost)
                return -1; 

            return 0; 
        });
    }
}