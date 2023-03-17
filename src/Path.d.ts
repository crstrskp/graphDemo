import { Edge } from "./Edge";
import { Vertex } from "./Vertex";
export declare class Path {
    steps: (Edge | Vertex)[];
    totalCost: number;
    addStep(step: Vertex | Edge): void;
    private calculateTotalCost;
    /** NOTE: alters collection!
     * Removes the first element of the steps list.
     * @returns the removed element
     */
    next(): Edge | Vertex | undefined;
    peek(): Edge | Vertex | undefined;
    getTotalCost(): number;
    /**NOTE: alters collection!
     * mutates the <steps> array
     */
    reverse(): void;
    toString: () => string;
}
