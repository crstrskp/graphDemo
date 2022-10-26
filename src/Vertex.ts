import { Edge } from "./Edge";
import { IVertex } from "./IVertex";

export class Vertex implements IVertex
{
    label : string; 
    visited : boolean;  // used for iterating via search algorithms
    cost : number;      
    object : any; 
    prev : Edge | undefined;
    

    public setLabel(s : string) { this.label = s; }
    public getLabel() { return this.label; }

    constructor(label : string) {
        this.label = label; 
        this.visited = false; 
        this.cost = 0;
    }

    public updateCost() {
        // find pool
        // update price ^^ 
            //timedAwait ?? this.object.UpdatePrice();
        // set cost to price ^^ 
            //this.cost = this.
    }

    public setCost(cost : number) { this.cost = cost; }

    public getCost() { return this.cost; }

    public getObject() { return this.object; }
    
    public getPrev() { return this.prev; }

    public setPrev(e : Edge) { this.prev = e; }

}