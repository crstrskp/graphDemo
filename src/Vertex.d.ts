import { Edge } from "./Edge";
import { IVertex } from "./IVertex";
export declare class Vertex implements IVertex {
    label: string;
    visited: boolean;
    cost: number;
    object: any;
    prev: Edge | undefined;
    setLabel(s: string): void;
    getLabel(): string;
    constructor(label: string);
    updateCost(): void;
    setCost(cost: number): void;
    getCost(): number;
    getObject(): any;
    getPrev(): Edge;
    setPrev(e: Edge): void;
}
