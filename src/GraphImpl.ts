import { Edge } from "./Edge";
import { IGraph } from "./IGraph";
import { Vertex } from "./Vertex";
import { IVertex } from './IVertex';

export class GraphImpl implements IGraph
{
    edges : Edge[];
    vertices : Vertex[];
    
    constructor() {
        this.edges = [];
        this.vertices = [];
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
        this.edges.forEach((e) => {
            if (e != null && e != undefined) 
            {
                edges.push(e);
            }
        });

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