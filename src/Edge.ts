import { Vertex } from "./Vertex";
import { Attributes } from "./types/Attributes";

export class Edge
{
    start : Vertex; 
    end : Vertex; 
    id : number;
    cost : number; 
    prev : Vertex | undefined;
    attributes : Attributes;
    /**
     *
     */
    constructor(start : Vertex, end : Vertex) {
        this.start = start; 
        this.end = end; 
        this.cost = -1;
        this.attributes = {};
        this.id = 0; // Will be set by GraphImpl.generateId()
    }

    getCost(): number {
        if (this.cost !== -1) {
            return this.cost;
        } else {
            const payload = this.getAttribute("payload");
            if (typeof payload === 'number') {
                return payload;
            } else if (payload && typeof payload.getCost === 'function') {
                return payload.getCost();
            } else {
                return 1; // default cost
            }
        }
    }

    public setCost(cost : number) { 
        this.cost = cost;
    }

    public getPrev() { return this.prev; }

    public setPrev(p : Vertex) { this.prev = p; }


    public getId() : number { return this.id; }
    
    public setAttribute(key : string, value : any) { this.attributes[key] = value; }
    
    public getAttribute(key : string) { return this.attributes[key]; }

}