import { Vertex } from "./Vertex";
import { Path } from './Path';

export interface IGraphSearch
{
    bellmanFord(v : Vertex) : any;
    bmf_negativeCycles() : any;
    dijkstra_shortestPath(src : Vertex, dest : Vertex) : Path;
}