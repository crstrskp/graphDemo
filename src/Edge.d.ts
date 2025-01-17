import { Vertex } from "./Vertex";
export declare class Edge {
    start: Vertex;
    end: Vertex;
    id: number;
    obj: any;
    cost: number;
    prev: Vertex | undefined;
    /**
     *
     */
    constructor(start: Vertex, end: Vertex);
    getCost(): number;
    setCost(cost: number): void;
    getPrev(): Vertex;
    setPrev(p: Vertex): void;
}
