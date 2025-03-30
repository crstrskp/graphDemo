import { Edge } from "./Edge";
import { IVertex } from "./IVertex";
export declare class Vertex implements IVertex {
    label: string;
    visited: boolean;
    cost: number;
    attributes: {
        [key: string]: any;
    };
    prev: Edge | undefined;
    id: number;
    setLabel(s: string): void;
    getLabel(): string;
    constructor(label: string);
    setCost(cost: number): void;
    getCost(): number;
    getPrev(): Edge;
    setPrev(e: Edge): void;
    getId(): number;
    setAttribute(key: string, value: any): void;
    getAttribute(key: string): any;
}
