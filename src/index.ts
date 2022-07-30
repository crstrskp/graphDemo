import { GraphDemo } from "./GraphDemo";
import { Utilities } from "./Utilities";
import { Vertex } from "./Vertex";




const main = async () => 
{
    var graphDemo = new GraphDemo();

    var s = new Vertex("S")
    var a = new Vertex("A")
    var b = new Vertex("B")
    var c = new Vertex("C")
    var d = new Vertex("D")
    var e = new Vertex("E")
    var f = new Vertex("F")
    var g = new Vertex("G")
    
    graphDemo.addVertex(s);
    graphDemo.addVertex(a);
    graphDemo.addVertex(b);
    graphDemo.addVertex(c);
    graphDemo.addVertex(d);
    graphDemo.addVertex(e);
    graphDemo.addVertex(f);
    graphDemo.addVertex(g);

    graphDemo.addEdge(s, a);
    graphDemo.addEdge(s, b);
    graphDemo.addEdge(s, c);

    graphDemo.addEdge(a, d);
    graphDemo.addEdge(b, e);
    graphDemo.addEdge(c, f);

    graphDemo.addEdge(d, g);
    graphDemo.addEdge(e, g);
    graphDemo.addEdge(f, g);
    

    var something = graphDemo.depthFirstSearch();


    // -- debug
//     console.log("vertices: ");
//     console.log(graphDemo.vertices);

//     console.log("stack: ");
//     console.log(graphDemo.stack);
    
// console.log(graphDemo.edges);
    // console.log(graphDemo.edges.length);

}

main().then(() => 
{
    console.log("Main done");
});