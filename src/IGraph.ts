import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

export interface IGraph
{
    /**
     * return an array of all the vertices of the graph.
     * @Input: None; @Output: array of vertices
     */
    getVertices() : Array<Vertex>; 

    /**
     * Return an array of all the edges of the graph.
     * @Input: None; @Output: array of edges
     */
    getEdges() : Array<Edge>;

    
    /**
     * Return an array of the edges incident upon vertex v.
     * @param v incident edges upon this given vertex
     * @Output: array of edges incident upon vertex v. 
     */
    getIncidentEdges(v : Vertex) : Array<Edge>;


    /**
     * Returns the endvertex of edge {e} distinct from vertex {v}. An error occurs if {e} is not incident on {v}.
     * @param v the vertex of which the opposite is sought. 
     * @param e the edge of which the endVertex is sought. 
     */
    getOpposite(v : Vertex, e : Edge) : Vertex;


    /**
     * Return an array storing the end vertices of edge {e}.
     * @param e Edge that connects the vertices returned. 
     */
    getEndVertices(e : Edge) : Array<Vertex>; 


    /**
     * Test whether vertices {v} and {w} are adjacent. 
     * @param v Vertex 1
     * @param w Vertex 2
     */
    areAdjacent(v : Vertex, w : Vertex) : boolean;


    /**
     * Insert and return a new Vertex storing element o
     * @param o Object
     */
    insertVertex(o : any) : Vertex;

    /**
     * Insert and return a new undirected edge with end vertices v and w storing element o 
     * @param v Vertex 1
     * @param w Vertex 2
     * @param o the object that will be used as the element for the edge. 
     */
    insertEdge(v : Vertex, w : Vertex, o : any) : Edge;

    /**
     * Insert and return a new directed edge from vertex {start} to vertex {end} storin element o
     * @param start Start vertex
     * @param end End Vertex
     * @param o the object that will be used as the element for the edge. 
     */
    insertDirectedEdge(start : Vertex, end : Vertex, o : any) : Edge; 

    /**
     * Remove vertex v and all its incident edges.
     * @param v The vertex that are to be removed. 
     */
    removeVertex(v : Vertex) : undefined; 

    /**
     * Remove edge {e}. 
     * @param e The edge that are to be removed. 
     */
    removeEdge(e : Edge) : undefined
}
