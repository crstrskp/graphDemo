import { Vertex } from "./Vertex";

export class Edge
{
    start : Vertex; 
    end : Vertex; 
    obj : any;

    cost : number; 
    prev : Vertex | undefined;
    /**
     *
     */
    constructor(start : Vertex, end : Vertex) {
        this.start = start; 
        this.end = end; 

        this.cost = -1;
    }

    getCost(): number {
        if (this.cost !== -1)
        {
            return this.cost;
        }
        else
        {
            if (typeof this.obj === 'number') {
                return this.obj;
            } else if (this.obj && typeof this.obj.getCost === 'function') {
                return this.obj.getCost();
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

    public getObj() : any { return this.obj; }

    public setObj(obj : any) { this.obj = obj; }

}