import { Vertex } from "./Vertex";

export class Utilities
{
    static jestTest() {
        return 42;
    }
    
    static getAllAdjacentVertices(v : Vertex) 
    {
        var inbound = Utilities.getAllVerticesLeadingTo(v);
        var outbound = Utilities.getAllVerticesLeadingFrom(v);

        var result = new Array<Vertex>();

        inbound.forEach((element) => {
            result.push(element);
        });

        outbound.forEach(element => {
            result.push(element);
        });

        return result;
    }

    public static getAllVerticesLeadingTo(v : Vertex) 
    {
        var result = new Array<Vertex>(); 

        v.connectedEdges.forEach((element) => 
        {
            if (element.end == v) 
                result.push(element.start);
        });

        return result; 
    }

    public static getAllVerticesLeadingFrom(v : Vertex)
    {
        var result = new Array<Vertex>();

        v.connectedEdges.forEach((element) => 
        {
            if (element.start == v)
                result.push(element.end);
        });

        return result;
    }

}

export function jestTest2()
{
    return 42;
}