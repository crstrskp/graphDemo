import { GraphImpl } from "./GraphImpl";
import { Vertex } from "./Vertex";
import { Attributes } from "./types/Attributes";

export class Edge
{
    start       : Vertex; 
    end         : Vertex; 
    id          : number; 
    obj         : any;
    attributes  : Attributes;
    cost        : number; 
    prev        : Vertex | undefined;


    constructor(start : Vertex, end : Vertex) {
        this.id = GraphImpl.generateId();
        this.start = start; 
        this.end = end; 
        this.cost = -1;
        this.attributes = {};
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

    public getId() { return this.id; }

    public setAttribute(key : string, value : any) { this.attributes[key] = value; }
    
    public getAttribute(key : string) { return this.attributes[key]; }
}