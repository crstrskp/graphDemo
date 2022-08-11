import { Edge } from "./Edge";
import { IGraph } from "./IGraph";
import { Vertex } from "./Vertex";

export class GraphImpl implements IGraph
{
    getVertices(): Vertex[] {
        throw new Error("Method not implemented."); 
    }
    getEdges(): Edge[] {
        throw new Error("Method not implemented.");
    }
    getIncidentEdges(v: Vertex): Edge[] {
        throw new Error("Method not implemented.");
    }
    getOpposite(v: Vertex, e: Edge): Vertex {
        throw new Error("Method not implemented.");
    }
    getEndVertices(e: Edge): Vertex[] {
        throw new Error("Method not implemented.");
    }
    areAdjacent(v: Vertex, w: Vertex): boolean {
        throw new Error("Method not implemented.");
    }
    insertVertex(o: any): Vertex {
        throw new Error("Method not implemented.");
    }
    insertEdge(v: Vertex, w: Vertex, o: any): Edge {
        throw new Error("Method not implemented.");
    }
    insertDirectedEdge(start: Vertex, end: Vertex, o: any): Edge {
        throw new Error("Method not implemented.");
    }
    removeVertex(v: Vertex): undefined {
        throw new Error("Method not implemented.");
    }
    removeEdge(e: Edge): undefined {
        throw new Error("Method not implemented.");
    }
    
}