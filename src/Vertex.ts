import { Edge } from "./Edge";

export class Vertex
{
    label : string; 
    visited : boolean; // used for iterating via search algorithms
    connectedEdges: Edge[];

    setLabel(s : string) { this.label = s; }

    constructor(label : string) {
        this.connectedEdges = new Array<Edge>();
        this.label = label; 
        this.visited = false; 
    }

    public isAdjacent(v : Vertex) : boolean
    {
        this.connectedEdges.forEach((element) => {
            // console.log("this element is connected to: ", element.start.label, " and: ", element.end.label)
            if (element.start == v || element.end == v)
            {
                console.log("should be returning true; element: ", element.start.label,"->", element.end.label, "v: ", v.label);
                return true;
            }
        });

        return false;
    }
}