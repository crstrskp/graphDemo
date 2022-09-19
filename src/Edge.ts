import { Vertex } from "./Vertex";

export class Edge
{
    start : Vertex; 
    end : Vertex; 
    obj : any;

    cost : number; 
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

    setCost(cost : number)  
    {
        this.cost = cost;
    }
}