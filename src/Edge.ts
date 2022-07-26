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

        this.cost = this.getCost();
    }

    getCost(): number {
        return 1;
    }

    /**
     * this is a debug method, as all costs should be set from pricemaps and fees.
     * @param cost weight of the edge
     */
    setCost(cost : number)  
    {
        this.cost = cost;
    }
}