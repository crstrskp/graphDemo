import { Edge } from "./Edge";
import { IGraph } from "./IGraph";
import { Vertex } from "./Vertex";

export class GraphImpl implements IGraph
{
    getAllVertices(): Vertex[] {
        throw new Error("Method not implemented."); 
    }
    getAllEdges(): Edge[] {
        throw new Error("Method not implemented.");
    }
    getIncidentEdges(v: Vertex): Edge[] {
        throw new Error("Method not implemented.");
    }
    getOpposite(v: Vertex, e: Edge): Vertex {
        throw new Error("Method not implemented.");
    }
    getVertices(e: Edge): Vertex[] {
        throw new Error("Method not implemented.");
    }
    areAdjacent(v: Vertex, w: Vertex): boolean {
    // public isAdjacent(v : Vertex) : boolean
    // {
    //     this.connectedEdges.forEach((element) => {
    //         // console.log("this element is connected to: ", element.start.label, " and: ", element.end.label)
    //         if (element.start == v || element.end == v)
    //         {
    //             console.log("should be returning true; element: ", element.start.label,"->", element.end.label, "v: ", v.label);
    //             return true;
    //         }
    //     });

    //     return false;
    // }

        throw new Error("Method not implemented.");
    }
    insertVertex(o: any): Vertex {
        throw new Error("Method not implemented.");
    }
    insertEdge(v: Vertex, w: Vertex, o: any): Edge {
        throw new Error("Method not implemented.");
    }
    removeVertex(v: Vertex): undefined {
        throw new Error("Method not implemented.");
    }
    removeEdge(e: Edge): undefined {
        throw new Error("Method not implemented.");
    }
}