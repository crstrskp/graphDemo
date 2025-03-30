import { Edge } from "./Edge";
import { GraphImpl } from "./GraphImpl";
import { IVertex } from "./IVertex";
import { Attributes } from "./types/Attributes";

export class Vertex implements IVertex
{
    label       : string; 
    id          : number; 
    visited     : boolean;  // used for iterating via search algorithms
    cost        : number;      
    attributes  : Attributes;
    prev        : Edge | undefined;

    

    public setLabel(s : string) { this.label = s; }
    public getLabel() { return this.label; }

    constructor(payload : any) {
        this.id = GraphImpl.generateId();
        this.attributes = {};

        if (typeof payload === 'string') {
            this.label = payload;
        }
        else {
            this.setAttribute("payload", payload);
            this.label = "Vertex " + this.id;
        }

        this.visited = false; 
        this.cost = 0;
    }

    public setCost(cost : number) { this.cost = cost; }

    public getCost() { return this.cost; }

    public getPrev() { return this.prev; }

    public setPrev(e : Edge) { this.prev = e; }

    public getId() { return this.id; }
    
    public setAttribute(key : string, value : any) { this.attributes[key] = value; }
    
    public getAttribute(key : string) { return this.attributes[key]; }
}