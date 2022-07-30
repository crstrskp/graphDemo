import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

export class GraphDemo
{
    vertices = new Array<Vertex>();
    edges = new Array<Edge>();
    
    stack = new Array<Vertex>();


    addVertex(v : Vertex)
    {   
        this.vertices.push(v);
    }

    addEdge(start : Vertex, end : Vertex)
    {
        var edge = new Edge(start, end);
        start.connectedEdges.push(edge);
        end.connectedEdges.push(edge);
        this.edges.push(edge);
    }

    push(item : Vertex) 
    {
        this.stack.push(item);
    }

    pop() : Vertex | undefined 
    {
        return this.stack.pop();
    }

    peek() : Vertex
    {
        return this.stack[this.stack.length-1];
    }

    isStackEmpty() : boolean
    {
        return this.stack.length < 1;
    }

    getAdjUnivisitedVertex(vertex : Vertex) : Vertex | undefined
    {
        this.vertices.forEach((element) => 
        {
            if (element.isAdjacent(vertex))
                return element;
        })

        return undefined;
    }

    depthFirstSearch() {
        console.log(" ------ DEPTH FIRST SEARCH ------ ");

        var v = this.vertices[0]
        v.visited = true;

        this.displayVertex(v);
        this.push(v);
        
        console.log(this.stack.length);


        while(!this.isStackEmpty())
        {
            var a = this.peek();
            // console.log("something: ", a);
            var univisitedVertex = this.getAdjUnivisitedVertex(a);

            console.log("nothing: ", univisitedVertex?.label);
            if (univisitedVertex == undefined) 
            {
                this.pop();
            }
            else
            {
                univisitedVertex.visited = true;
                this.displayVertex(univisitedVertex);
                this.push(univisitedVertex);
            }
        }

        // reset all visited vertices
        this.vertices.forEach((element) => {
            element.visited = false; 
        })
    }
    
    displayVertex(v: Vertex) {
        console.log("displaying vertex: ", v.label);
    }
}