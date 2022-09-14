import { Edge } from "./Edge";
import { IGraph } from "./IGraph";
import { Vertex } from "./Vertex";
import { IVertex } from './IVertex';
import { IGraphSearch } from "./IGraphSearch";
import { displayPartsToString } from "typescript";
import { SubGraph } from "./SubGraph";
import { ISubGraphBuilder } from "./ISubGraphBuilder";

export class GraphImpl implements IGraph, IGraphSearch, ISubGraphBuilder
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
                var start = this.edges[j].start;
                var end = this.edges[j].end;
                var cost = this.edges[j].getCost();

                var startCost = vDists.get(start); 
                if (startCost! + cost < vDists.get(end)!)
                    vDists.set(end, startCost! + cost);
            }
        }

        return vDists;
    }

    bmf_negativeCycles() 
    {
        var cycles : SubGraph[] = [];

        // for (var i =  0; i < this.vertices.length; i++)
        // {
            // console.log(this.vertices[i]);

            var vDists = this.bellmanFord(this.vertices[0]);

            console.log(vDists);

            for (var j = 0; j < this.edges.length; j++)
            {
                var start = this.edges[j].start;
                var end = this.edges[j].end;
                var cost = this.edges[j].getCost();
                
                var c = vDists.get(start)! + cost;
                if (c < vDists.get(end)!)
                {
                    console.log("TODO: Return negative cycle as subgraph");
                    // cycles.push(SOME SUBGRAPH ?? )
                    var cycleEdges : Edge[] =[];
                    var cycleVertices : Vertex[] = []; // dno if these are needed? 
                    cycles.push(new SubGraph(cycleEdges,cycleVertices,start));
                }
            }
        // }

        return cycles;
    }

    createSubGraph(src : Vertex, dest : Vertex) : SubGraph
    {
        return new SubGraph(this.edges, this.vertices, src);
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
        var verts : Vertex[] = [];// = this.vertices; 
        for (var i = 0; i < this.vertices.length; i++)
        {
            // console.log("if ", this.vertices[i].label, " != ", v.label, " then add ", this.vertices[i].label, " to this.vertices");
            if (this.vertices[i].label != v.label)
            {
                verts.push(this.vertices[i]);
            }
            else 
            {
                var vEdges = this.getIncidentEdges(v);
                vEdges.forEach((e) => 
                {
                    this.removeEdge(e);
                });
            }
        }
        this.vertices = verts.reverse(); 
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