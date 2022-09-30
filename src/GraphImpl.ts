import { Edge } from "./Edge";
import { IGraph } from "./IGraph";
import { Vertex } from "./Vertex";
import { IGraphSearch } from "./IGraphSearch";
import { Path } from "./Path";
import { IPathBuilder } from './IPathBuilder';

export class GraphImpl implements IGraph, IGraphSearch, IPathBuilder
{
    edges : Edge[];
    vertices : Vertex[];
    
    constructor() {
        this.edges = [];
        this.vertices = [];
    }

    bellmanFord(src : Vertex) {
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

                var startCost = vDists.get(start); 
              
                if (startCost! + cost < vDists.get(end)!)
                    vDists.set(end, startCost! + cost);
            }
        }

        return vDists;
    }

    bmf_negativeCycles() 
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

                console.log("Negative cycle detected at ", start.getLabel(), " -> ", end.getLabel());
                cycles.push(new Path(start));
            }
        }

        return cycles;
    }
    
    dijkstra_shortestPath(src: Vertex, dest: Vertex): Path 
    {
        /*
        1. Create a list of “distances” equal to the number of nodes and initialize each value to infinity
        2. Set the “distance” to the starting node equal to 0
        3. Create a list of “visited” nodes set to false for each node (since we haven’t visited any yet)
        4. Loop through all the nodes
            4.a Loop through all the nodes again, and pick the one that is the shortest distance away and not yet visited
            4.b Set that node to visited
            4.c Set the distance in the distance list to the distance to that node
        5. The original “distance” list should now contain the shortest distance to each node or infinity if a node is unreachable from the desired starting node
        */

       
        var unvisitedNodes = this.getAdjacentVertices(src);
        unvisitedNodes.forEach((v) => 
        {
            v.visited = false; 
            // dists.push(???)
        });
        
        src.setCost(0);
        
        
        // build path
        var path = new Path(src); 
       
        return path; 
    }

    getAllVertices(): Vertex[] 
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
    
    getAllEdges(): Edge[] 
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
    
    getIncidentEdges(v: Vertex): Edge[]
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

    getIncidentStartEdges(v: Vertex): Edge[] 
    {
        var incidentEdges : Edge[] = [];

        this.edges.forEach((edge) => {
            if (edge.start === v)
                if (incidentEdges.includes(edge) == false) 
                    incidentEdges.push(edge);
        });

        return incidentEdges;    
    }

    getIncidentEndEdges(v: Vertex): Edge[] 
    {
        var incidentEdges : Edge[] = [];

        this.edges.forEach((edge) => {
            if (edge.end === v)
                if (incidentEdges.includes(edge) == false) 
                    incidentEdges.push(edge);
        });

        return incidentEdges;
    }

    getOpposite(v: Vertex, e: Edge): Vertex | undefined 
    {
        if (e.start === v) return e.end;
        else if (e.end === v) return e.start;
        else return undefined;
    }

    getVertices(e: Edge): Vertex[] 
    {
        var vertices : Vertex[] = [];

        vertices.push(e.start!);
        vertices.push(e.end!);
        
        return vertices; 
    }

    getAdjacentVertices(v: Vertex): Vertex[] 
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

    areAdjacent(v: Vertex, w: Vertex): boolean 
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

    insertVertex(o: any): Vertex 
    {
        if (this.isOfTypeVertex(o))
        {
            this.vertices.push(o);
            return o;
        }
        else
        {
            var v = new Vertex(o);
            this.vertices.push(v);
            return v;
        }
    }

    isOfTypeVertex(input: any): boolean
    {
        return input instanceof Vertex;
    }
    
    insertEdge(v: Vertex, w: Vertex, o: any): Edge 
    {
        var e = new Edge(v, w);
        if (Number.isFinite(o))
        {
            e.setCost(o);
        }

        this.edges.push(e);
        return e; 
    }

    removeVertex(v: Vertex)
    {
        var edges = this.getIncidentEdges(v);
        for (var i = 0; i < edges.length; i++)
        {
            this.removeEdge(edges[i]);
        }

        var i = this.vertices.indexOf(v);
        var removedElement = this.vertices.splice(i, 1);
    }

    removeEdge(e: Edge) 
    {
        for (var i = 0; i < this.edges.length; i++)
        {
            if (this.edges[i] === e)
                delete this.edges[i];
        }
        this.getAllEdges(); // updates the this.edges array
        
    }

}