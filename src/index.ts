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
    
    graphDemo.addVertex(s);
    graphDemo.addVertex(a);
    graphDemo.addVertex(b);
    graphDemo.addVertex(c);
    graphDemo.addVertex(d);

    graphDemo.addEdge(s, a);
    graphDemo.addEdge(s, b);
    graphDemo.addEdge(s, c);
    graphDemo.addEdge(a, d);
    graphDemo.addEdge(b, d);
    graphDemo.addEdge(c, d);
    

    var something = graphDemo.depthFirstSearch();


    // -- debug
//     console.log("vertices: ");
//     console.log(graphDemo.vertices);

//     console.log("stack: ");
//     console.log(graphDemo.stack);
    console.log(graphDemo.edges);
    console.log(graphDemo.edges.length);

}

main().then(() => 
{
    console.log("Main done");
});