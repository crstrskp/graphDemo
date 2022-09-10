import { Edge } from "../src/Edge";
import { GraphImpl } from "../src/GraphImpl";
import { Vertex } from '../src/Vertex';

describe('GraphImpl_testSuite', () => 
{
    test('graph_getAllVertices', () => 
    {
        var graph = new GraphImpl(); 

        var count = 0; 
        
        var v1 = graph.insertVertex("v1");
        count++;
        var v2 = graph.insertVertex("v2");
        count++;
        var v3 = graph.insertVertex("v3");
        count++;

        var allVertices = graph.getAllVertices();
        
        expect(allVertices.length).toEqual(count);
        expect(allVertices[0]).toEqual(v1);
        expect(allVertices[1]).toEqual(v2);
        expect(allVertices[2]).toEqual(v3);
        
        graph.removeVertex(v3);
        count--;

        allVertices = graph.getAllVertices();

        expect(allVertices).toBe(graph.vertices);
        
        expect(allVertices.length).toEqual(count);
    });

    test('graph_getEdges', () => 
    {
        var graph = new GraphImpl(); 

        var v1 = graph.insertVertex("vertex1");
        var v2 = graph.insertVertex("vertex2");
        var v3 = graph.insertVertex("vertex3");

        expect(graph.getAllEdges().length).toEqual(0);

        var e1 = graph.insertEdge(v1, v2, undefined);
        var e1 = graph.insertEdge(v2, v3, undefined);
        var e1 = graph.insertEdge(v3, v1, undefined);
        var e1 = graph.insertEdge(v3, v2, undefined);
        var e1 = graph.insertEdge(v3, v2, undefined);

        var allEdges = graph.getAllEdges();

        expect(allEdges.length).toEqual(5);
    });

    // test('graph_getIncidentEdges', () => {
    //     var graph = new GraphImpl();

    //     var v1 = graph.insertVertex("v1");
    //     var v2 = graph.insertVertex("v2");
    //     var v3 = graph.insertVertex("v3");

    //     var e1_2 = graph.insertEdge(v1, v2, "e1_2");
    //     var e1_3 = graph.insertEdge(v1, v2, "e1_3");
    //     var e2_1 = graph.insertEdge(v1, v2, "e2_1");
    //     var e2_3 = graph.insertEdge(v1, v2, "e2_3");
    //     var e3_1 = graph.insertEdge(v1, v2, "e3_1");
    //     var e3_2 = graph.insertEdge(v1, v2, "e3_2");

        
    //     var isIncident = false; 
    //     var v1Edges = graph.getIncidentEdges(v1);
    //     var v2Edges = graph.getIncidentEdges(v2);
    //     var v3Edges = graph.getIncidentEdges(v3);
        

    //     expect(v1Edges.length).toEqual(4);
    //     expect(v2Edges.length).toEqual(4);
    //     expect(v3Edges.length).toEqual(4);

    //     v1Edges.forEach((e : Edge) => {
    //         if (e.end == v1 || e.start == v1)
    //             isIncident = true;

    //         expect(isIncident).toEqual(true);
    //         isIncident = false;
    //     });

    //     expect(e3_2.start == v1 || e3_2.end == v1).toEqual(false);
    //     expect(e2_3.start == v1 || e2_3.end == v1).toEqual(false);

    //     v2Edges.forEach((e : Edge) => {
    //         if (e.end == v2 || e.start == v2)
    //             isIncident = true;
            
    //         expect(isIncident).toEqual(true);
    //         isIncident = false;
    //     });

    //     expect(e3_1.start == v2 || e3_1.end == v2).toEqual(false);
    //     expect(e1_3.start == v2 || e1_3.end == v2).toEqual(false);

    //     v3Edges.forEach((e : Edge) => {
    //         if (e.end == v3 || e.start == v3)
    //             isIncident = true;
            
    //         expect(isIncident).toEqual(true);
    //         isIncident = false;
    //     });
        
    //     expect(e2_1.start == v3 || e2_1.end == v3).toEqual(false);
    //     expect(e1_2.start == v3 || e1_2.end == v3).toEqual(false);
    // });

    test('graph_getOpposite', () => {
        /**
     * Returns the endvertex of edge {e} distinct from vertex {v}. Returns undefined if {e} is not incident on {v}.
     * @param v the vertex of which the opposite is sought. 
     * @param e the edge of which the endVertex is sought. 
     */
         var graph = new GraphImpl(); 

        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var v3 = graph.insertVertex("v3");

        var e1_2 = graph.insertEdge(v1, v2, "e1_2");
        var e2_3 = graph.insertEdge(v2, v3, "e2_3");

        expect(graph.getOpposite(v1, e1_2)).toEqual(v2);
        expect(graph.getOpposite(v2, e1_2)).toEqual(v1);

        expect(graph.getOpposite(v3, e1_2)).toEqual(undefined);
        expect(graph.getOpposite(v1, e2_3)).toEqual(undefined);
    });

    test('graph_getVertices', () => {
        var graph = new GraphImpl(); 

        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var e1_2 = graph.insertEdge(v1, v2, "e1_2");

        var vertices = graph.getVertices(e1_2);
        expect(vertices[0]).toEqual(v1);
        expect(vertices[1]).toEqual(v2);
        
    });

    test('graph_areAdjacent', () => 
    {
        var graph = new GraphImpl(); 

        var v = new Vertex("TEST");
        var w = new Vertex("TEST2");
        
        expect(graph.areAdjacent(v, w)).toEqual(false);
        
        var edge = graph.insertEdge(v, w, "");
        
        var adj = graph.areAdjacent(v, w);
        expect(true).toEqual(true);
        expect(graph.areAdjacent(w, v)).toEqual(true);
        
        graph.removeEdge(edge);
        
        expect(graph.areAdjacent(v, w)).toEqual(false);
    });

    test('graph_insertVertex', () => {
        var graph = new GraphImpl(); 

        var allVertices = graph.getAllVertices();
        expect(allVertices.length).toEqual(0);

        var v1 = graph.insertVertex("v1");

        allVertices = graph.getAllVertices();
        expect(allVertices.length).toEqual(1);

        expect(allVertices[0]).toBe(v1);

        // add a second vertex
        var v2 = graph.insertVertex("v2");

        allVertices = graph.getAllVertices();
        expect(allVertices.length).toEqual(2);

        expect(allVertices[1]).toBe(v2);
    });

    test('isOfTypeVertex', () => {
        var graph = new GraphImpl();

        var v = new Vertex("v1");

        expect(graph.isOfTypeVertex(v)).toBe(true);
        expect(graph.isOfTypeVertex(undefined)).toBe(false);

        var v2 = graph.insertVertex("v2");

        expect(graph.isOfTypeVertex(v2)).toBe(true);
        
        var v3 = graph.insertVertex(v2); // this is just redundant and should never be used like this. 
        expect(graph.isOfTypeVertex(v3)).toBe(true);
    })

    test('graph_insertEdge', () => {
        var graph = new GraphImpl();

        var allEdges = graph.getAllEdges(); 
        expect(allEdges.length).toEqual(0);

        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var e1_2 = graph.insertEdge(v1, v2, "e1_2");

        allEdges = graph.getAllEdges(); 
        expect(allEdges.length).toEqual(1);

        expect(allEdges[0]).toBe(e1_2);

        // add a second edge: 
        var e2_1 = graph.insertEdge(v2, v1, "e2_1");
        allEdges = graph.getAllEdges();
        expect(allEdges.length).toEqual(2);

        expect(allEdges[1]).toBe(e2_1);
    });

    test('graph_removeVertex', () => {
        var graph = new GraphImpl(); 

        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        
        var allVertices = graph.getAllVertices();
        expect(allVertices.length).toEqual(2);
        
        expect(allVertices[0]).toBe(v1);
        expect(allVertices[1]).toBe(v2);
        
        graph.removeVertex(v1);
        
        allVertices = graph.getAllVertices();

        expect(allVertices.length).toEqual(1);
        expect(allVertices[0]).toBe(v2);
    });

    
    // test('graph_removeIncidentEdgeWhenRemovingVertex', () => {
    //     var graph = new GraphImpl(); 

    //     var v1 = graph.insertVertex("v1");
    //     var v2 = graph.insertVertex("v2");
    //     var e1_2 = graph.insertEdge(v1, v2, "e1_2");

    //     var allEdges = graph.getAllEdges();
    //     expect(allEdges.length).toEqual(1);
        
    //     graph.removeVertex(v1);
    //     allEdges = graph.getAllEdges();
    //     expect(allEdges.length).toEqual(0);
    // });

    // test('graph_removeIncidentEdgeWhenRemovingVertex2', () => {
    //     var graph = new GraphImpl(); 

    //     var v1 = graph.insertVertex("v1");
    //     var v2 = graph.insertVertex("v2");
    //     var v3 = graph.insertVertex("v2");
    //     var v4 = graph.insertVertex("v2");
        
    //     var e1_2 = graph.insertEdge(v1, v2, "e1_2");
    //     var e2_1 = graph.insertEdge(v2, v1, "e2_1");
        
    //     var e2_3 = graph.insertEdge(v2, v3, "e2_3");
    //     var e3_2 = graph.insertEdge(v3, v2, "e3_2");
        
    //     var e3_1 = graph.insertEdge(v4, v1, "e3_1");
    //     var e4_1 = graph.insertEdge(v4, v1, "e4_1");
        
    //     var allEdges = graph.getAllEdges();


    //     expect(allEdges.length).toEqual(6);
        
    //     graph.removeVertex(v1);
        
    //     allEdges = graph.getAllEdges();
    //     expect(allEdges.length).toEqual(2);

    //     expect(graph.getIncidentEdges(v3).length).toEqual(0);
    //     expect(graph.getIncidentEdges(v4).length).toEqual(0);

    // });

    test('graph_removeEdge', () => {
        var graph = new GraphImpl();
        
        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var e1_2 = graph.insertEdge(v1, v2, "e1_2");

        var allEdges = graph.getAllEdges();
        expect(allEdges.length).toEqual(1);
        
        graph.removeEdge(e1_2);
        
        allEdges = graph.getAllEdges();
        expect(allEdges.length).toEqual(0);
        
    });

    
    test('arrayRemovalTest', () => {
        var numbers : number[] = [];

        numbers.push(1);
        numbers.push(2);
        numbers.push(3);
        numbers.push(4);

        expect(numbers.length).toBe(4);
        
        numbers.pop();
        
        expect(numbers.length).toBe(3);

        var nums : number[] = [];

        for (var i = 0; i < numbers.length; i++)
        {
            if (numbers[i] != 2)
            {
                nums.push(numbers[i]);
            }
        }

        numbers = nums; 

        expect(numbers.length).toBe(2);

    });

    test('verticeArrayRemovalTest', () => {
        var vertices : Vertex[]  = []; 

        var v1 = new Vertex("v1");
        var v2 = new Vertex("v2");
        var v3 = new Vertex("v3");

        vertices.push(v1);
        vertices.push(v2);
        vertices.push(v3);

        expect(vertices.length).toBe(3);

        var tmpVerts : Vertex[] = []; 

        vertices.forEach((v) => 
        {
            if (v != v2)
                tmpVerts.push(v);
        });

        expect(tmpVerts.length).toBe(2);
        vertices = tmpVerts; 
        expect(vertices.length).toBe(2);
    });
});
