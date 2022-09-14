import { Vertex } from "./Vertex";

export interface IGraphSearch
{
    bellmanFord(v : Vertex) : any;
    bmf_negativeCycles() : any;
}