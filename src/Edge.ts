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
        if (Number.isFinite(this.cost))
        {
            return this.cost;
        }
        else
        {
            return this.obj.getCost();
        }
    }

    public setCost(cost : number) { this.cost = cost; }

    public getPrev() { return this.prev; }

    public setPrev(p : Vertex) { this.prev = p; }

    public getObj() : any { return this.obj; }

    public setObj(obj : any) { this.obj = obj; }

}