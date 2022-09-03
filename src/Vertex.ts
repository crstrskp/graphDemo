import { Edge } from "./Edge";
import { IVertex } from "./IVertex";

export class Vertex implements IVertex
{
    label : string; 
    visited : boolean;  // used for iterating via search algorithms
    fee : number;      
    object : any; 
    // connectedEdges: Edge[];

    public setLabel(s : string) { this.label = s; }
    public getLabel() { return this.label; }

    constructor(label : string) {
        // this.connectedEdges = new Array<Edge>();
        this.label = label; 
        this.visited = false; 
        this.fee = -1;
    }

    public updateCost() {
        // find pool
        // update price ^^ 
            //timedAwait ?? this.object.UpdatePrice();
        // set cost to price ^^ 
            //this.cost = this.
    }

    public getCost() { return this.fee; }

    public getObject() { return this.object; }

}