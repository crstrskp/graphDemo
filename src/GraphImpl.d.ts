import { Edge } from "./Edge";
import { IGraph } from "./IGraph";
import { Vertex } from './Vertex';
import { IGraphSearch } from "./IGraphSearch";
import { Path } from "./Path";
import { IPathBuilder } from './IPathBuilder';
export declare class GraphImpl implements IGraph, IGraphSearch, IPathBuilder {
    edges: Edge[];
    vertices: Vertex[];
    constructor();
    bellmanFord(src: Vertex): Map<Vertex, number>;
    bellmanFord_shortestPath(src: Vertex, dest: Vertex): Path;
    bmf_print(bmf: Map<Vertex, number>): void;
    bmf_negativeCycles(): Path[];
    dijkstra_shortestPath(src: Vertex, dest: Vertex): Path;
    getVertexByLabel(label: string): Vertex | undefined;
    getVertexById(id: number): Vertex | undefined;
    getAllVertices(): Vertex[];
    getAllEdges(): Edge[];
    getIncidentEdges(v: Vertex): Edge[];
    getIncidentStartEdges(v: Vertex): Edge[];
    getIncidentEndEdges(v: Vertex): Edge[];
    getOpposite(v: Vertex, e: Edge): Vertex | undefined;
    getVertices(e: Edge): Vertex[];
    getAdjacentVertices(v: Vertex): Vertex[];
    areAdjacent(v: Vertex, w: Vertex): boolean;
    insertVertex(o: any): Vertex;
    isOfTypeVertex(input: any): boolean;
    insertEdge(v: Vertex, w: Vertex, o: any): Edge;
    removeVertex(v: Vertex): void;
    removeEdge(e: Edge): void;
    /**
     *
     * @param edges list of edges to be sorted
     * @returns a new list of sorted edges
     */
    sortEdgesASC(edges: Edge[]): Edge[];
    /**
     *
     * @param edges list of edges to be sorted
     * @returns a new list of sorted edges
     */
    sortEdgesDESC(edges: Edge[]): Edge[];
}
