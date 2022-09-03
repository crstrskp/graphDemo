import { Vertex } from "./Vertex";

export class Edge
{
    start : Vertex; 
    end : Vertex; 

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
        return this.cost;
    }

    setCost(cost : number)  
    {
        this.cost = cost;
    }
}