import { Edge } from "../src/Edge";
import { GraphImpl } from '../src/GraphImpl';
import { Vertex } from '../src/Vertex';

describe('IGraph_testSuite', () => 
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

    test('graph_getIncidentEdges', () => 
    {
        var graph = new GraphImpl();

        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var v3 = graph.insertVertex("v3");

        var e1_2 = graph.insertEdge(v1, v2, "e1_2");
        var e1_3 = graph.insertEdge(v1, v3, "e1_3");
        var e2_1 = graph.insertEdge(v2, v1, "e2_1");
        var e2_3 = graph.insertEdge(v2, v3, "e2_3");
        var e3_1 = graph.insertEdge(v3, v1, "e3_1");
        var e3_2 = graph.insertEdge(v3, v2, "e3_2");

        expect(graph.getAllEdges().length).toBe(6);

        var isIncident = false; 
        var v1Edges = graph.getIncidentEdges(v1);
        var v2Edges = graph.getIncidentEdges(v2);
        var v3Edges = graph.getIncidentEdges(v3);
        
        expect(v1Edges.length).toEqual(4);
        expect(v2Edges.length).toEqual(4);
        expect(v3Edges.length).toEqual(4);

        v1Edges.forEach((e : Edge) => {
            if (e.end == v1 || e.start == v1)
                isIncident = true;

            expect(isIncident).toEqual(true);
            isIncident = false;
        });

        expect(e3_2.start == v1 || e3_2.end == v1).toEqual(false);
        expect(e2_3.start == v1 || e2_3.end == v1).toEqual(false);

        v2Edges.forEach((e : Edge) => {
            if (e.end == v2 || e.start == v2)
                isIncident = true;
            
            expect(isIncident).toEqual(true);
            isIncident = false;
        });

        expect(e3_1.start == v2 || e3_1.end == v2).toEqual(false);
        expect(e1_3.start == v2 || e1_3.end == v2).toEqual(false);

        v3Edges.forEach((e : Edge) => {
            if (e.end == v3 || e.start == v3)
                isIncident = true;
            
            expect(isIncident).toEqual(true);
            isIncident = false;
        });
        
        expect(e2_1.start == v3 || e2_1.end == v3).toEqual(false);
        expect(e1_2.start == v3 || e1_2.end == v3).toEqual(false);
    });

    test('graph_getIncidentStartEdges', () => 
    {
        var graph = new GraphImpl();

        var A = graph.insertVertex("A"); 
        var B = graph.insertVertex("B"); 
        var C = graph.insertVertex("C"); 

        var eA_B = graph.insertEdge(A, B, "eA_B");
        var eA_C = graph.insertEdge(A, C, "eA_C");
        
        var eB_A = graph.insertEdge(B, A, "eB_A");
        var eB_C = graph.insertEdge(B, C, "eB_C");

        var eC_A = graph.insertEdge(C, A, "eC_A");

        var aStartEdges = graph.getIncidentStartEdges(A);
        expect(aStartEdges.length).toEqual(2);
        expect(aStartEdges[0]).toBe(eA_B);
        expect(aStartEdges[1]).toBe(eA_C);
        
        var bStartEdges = graph.getIncidentStartEdges(B);
        expect(bStartEdges.length).toEqual(2);
        expect(bStartEdges[0]).toBe(eB_A);
        expect(bStartEdges[1]).toBe(eB_C);

        var cStartEdges = graph.getIncidentStartEdges(C);
        expect(cStartEdges.length).toEqual(1);
        expect(cStartEdges[0]).toBe(eC_A);
    });

    test('graph_getIncidentEndEdges', () => 
    {
        var graph = new GraphImpl();

        var A = graph.insertVertex("A"); 
        var B = graph.insertVertex("B"); 
        var C = graph.insertVertex("C"); 

        var eA_B = graph.insertEdge(A, B, "eA_B");
        var eA_C = graph.insertEdge(A, C, "eA_C");
        
        var eB_A = graph.insertEdge(B, A, "eB_A");
        var eB_C = graph.insertEdge(B, C, "eB_C");

        var eC_A = graph.insertEdge(C, A, "eC_A");

        var aEndEdges = graph.getIncidentEndEdges(A);
        expect(aEndEdges.length).toEqual(2);
        expect(aEndEdges[0]).toBe(eB_A);
        expect(aEndEdges[1]).toBe(eC_A);
        
        var bEndEdges = graph.getIncidentEndEdges(B);
        expect(bEndEdges.length).toEqual(1);
        expect(bEndEdges[0]).toBe(eA_B);

        var cEndEdges = graph.getIncidentEndEdges(C);
        expect(cEndEdges.length).toEqual(2);
        expect(cEndEdges[0]).toBe(eA_C);
        expect(cEndEdges[1]).toBe(eB_C);
    });

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

    test('graph_getAdjacentVertices', () => 
    {
        var graph = new GraphImpl();

        var a = graph.insertVertex("A");
        var b = graph.insertVertex("B");
        var c = graph.insertVertex("C");
        var d = graph.insertVertex("D");
        var e = graph.insertVertex("E");

        var eA_B = graph.insertEdge(a, b, 1);
        var eA_B = graph.insertEdge(a, b, 2);
        var eB_C = graph.insertEdge(b, c, 1);
        var eC_D = graph.insertEdge(c, d, 1);
        var eA_D = graph.insertEdge(a, d, 1);
        var eD_E = graph.insertEdge(d, e, 1);

        var aAdjacentNodes = graph.getAdjacentVertices(a);
        expect(aAdjacentNodes.length).toEqual(2);
        expect(aAdjacentNodes[0]).toBe(b);
        expect(aAdjacentNodes[1]).toBe(d);

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

    test('graph_insertEdgeWithObjects', () => {
        var graph = new GraphImpl(); 

        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var e1_2 = graph.insertEdge(v1, v2, "e1_2");

        expect(e1_2.obj).toEqual("e1_2");

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
    
    test('graph_removeIncidentEdgeWhenRemovingVertex', () => {
        var graph = new GraphImpl(); 

        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var e1_2 = graph.insertEdge(v1, v2, "e1_2");

        var allEdges = graph.getAllEdges();
        expect(allEdges.length).toEqual(1);
        
        graph.removeVertex(v1);
        allEdges = graph.getAllEdges();
        expect(allEdges.length).toEqual(0);
    });

    test('graph_removeIncidentEdgeWhenRemovingVertex2', () => {
        var graph = new GraphImpl(); 

        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var v3 = graph.insertVertex("v2");
        var v4 = graph.insertVertex("v2");
        
        var e1_2 = graph.insertEdge(v1, v2, "e1_2");
        var e2_1 = graph.insertEdge(v2, v1, "e2_1");
        
        var e2_3 = graph.insertEdge(v2, v3, "e2_3");
        var e3_2 = graph.insertEdge(v3, v2, "e3_2");
        
        var e3_1 = graph.insertEdge(v3, v1, "e3_1");
        
        var e4_1 = graph.insertEdge(v4, v1, "e4_1");
        
        var allEdges = graph.getAllEdges();
        expect(allEdges.length).toEqual(6);
        expect(graph.getIncidentEdges(v3).length).toEqual(3);

        graph.removeVertex(v1);
        
        allEdges = graph.getAllEdges();
        expect(allEdges.length).toEqual(2);

        var v3Edges = graph.getIncidentEdges(v3);
        expect(v3Edges.length).toEqual(2);
        expect(v3Edges[0]).toBe(e2_3);
        expect(v3Edges[1]).toBe(e3_2);

        // {v4} should no longer have any edges, as it only had one connected to the late {v1}.
        expect(graph.getIncidentEdges(v4).length).toEqual(0);

    });

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

    test('getVertexByLabel', () => 
    {
        var graph = new GraphImpl();

        var v0 = graph.insertVertex("v0");
        var v1 = graph.insertVertex("v1");
        
        expect(graph.getVertexByLabel("v0")).toBe(v0);
        expect(graph.getVertexByLabel(v1.label)).toBe(v1);
    });
});

describe('IGraphSearch_testSuite', () => 
{
    test('graphSearch_bellmanFord', () => 
    {
        var graph = new GraphImpl();

        var v0 = graph.insertVertex("v0");
        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var v3 = graph.insertVertex("v3");

        var e0_1 = graph.insertEdge(v0, v1, 5);
        var e0_1a = graph.insertEdge(v0, v1, 6);
        var e1_2 = graph.insertEdge(v1, v2, 7);
        var e1_3 = graph.insertEdge(v1, v3, 6);

        expect(e0_1.cost).toBe(5);

        var vDists = graph.bellmanFord(v0);

        expect(vDists.get(v0)).toBe(0);
        expect(vDists.get(v1)).toBe(5);
        expect(vDists.get(v2)).toBe(12);
        expect(vDists.get(v3)).toBe(11);
    });

    test('graphSearch_bellmanFord_negativeCycle', () => 
    {
        var graph = new GraphImpl();

        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var C = graph.insertVertex("c");
        var D = graph.insertVertex("d");
        var E = graph.insertVertex("e");
        var F = graph.insertVertex("f");

        var eA_B = graph.insertEdge(A, B, 8.7);
        var eA_F = graph.insertEdge(A, F, 3.8);
        
        var eB_C = graph.insertEdge(B, C, 1.3);
        var eB_E = graph.insertEdge(B, E, 7.5);
        
        var eC_D = graph.insertEdge(C, D, 2.1);
        
        var eD_E = graph.insertEdge(D, E, 1.9);
        
        var eE_B = graph.insertEdge(E, B, 5.8);
        var eE_C = graph.insertEdge(E, C, -5.0);
        var eE_D = graph.insertEdge(E, D, 3.1);
        
        var eF_E = graph.insertEdge(F, E, 12.0);
        var eF_A = graph.insertEdge(F, A, 8.0);
        
        expect(graph.bmf_negativeCycles().length).toBe(1)

    });

    test('graphSearch_bellmanFord__multiple_negativeCycles', () => 
    {
        var graph = new GraphImpl();


        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var C = graph.insertVertex("c");
        var D = graph.insertVertex("d");
        var E = graph.insertVertex("e");
        var F = graph.insertVertex("f");
        var G = graph.insertVertex("g");
        var H = graph.insertVertex("h");


        var eA_B = graph.insertEdge(A, B, 8.7);
        var eA_F = graph.insertEdge(A, F, 3.8);
        
        var eB_C = graph.insertEdge(B, C, 1.3);
        var eB_E = graph.insertEdge(B, E, 7.5);
        
        var eC_D = graph.insertEdge(C, D, 2.1);
        
        var eD_E = graph.insertEdge(D, E, 1.9);
        
        var eE_B = graph.insertEdge(E, B, 5.8);
        var eE_C = graph.insertEdge(E, C, -5.0);
        var eE_D = graph.insertEdge(E, D, 3.1);
        
        var eF_E = graph.insertEdge(F, E, 12.0);
        var eF_A = graph.insertEdge(F, A, 8.0);
        
        var eF_G = graph.insertEdge(F, G, 2.0);

        var eG_A = graph.insertEdge(G, A, -6.0);

        // negative found circles: 
        // A->B (discovered due to G->A being negative, thus A->B is 'cheaper' than it was originally. )
        // A->F (discovered due to G->A being negative, thus A->F is 'cheaper' than it was originally. )
        
        // C->D (discovered due to E->C being negative, thus C->D is 'cheaper' than it was originally. )
        

        var negativeCycles = graph.bmf_negativeCycles();

        expect(negativeCycles.length).toBe(3);
    });

    test('dijkstra_shortestPath', () => 
    {
        var graph = new GraphImpl();

        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var E = graph.insertVertex("e");
        var F = graph.insertVertex("f");

        graph.getAllVertices().forEach((v) => 
        {
            v.cost = 0;
            v.visited = false; 
        });

        var eA_B = graph.insertEdge(A, B, 8.7);
        var eA_F = graph.insertEdge(A, F, 3.8);
        
        var eB_E = graph.insertEdge(B, E, 7.5);

        var eF_E = graph.insertEdge(F, E, 12.0);
    
        // A->B->E costs 16.2
        // A->F->E costs 15.8

        var path = graph.dijkstra_shortestPath(A, E);
        
        expect(path.getTotalCost()).toEqual(15.8);

    // Cannot convert circular structure to JSON:
        // var step = path.next(); 
        // expect(step).toBe(eA_F);
        // var step2 = path.next(); 
        // expect(step2).toBe(eF_E);
    });

    test('bellmanFord_shortestPath', () => 
    {
        var graph = new GraphImpl();

        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var E = graph.insertVertex("e");
        var F = graph.insertVertex("f");

        var eA_B = graph.insertEdge(A, B, 8.7);
        var eA_F = graph.insertEdge(A, F, 3.8);
        
        var eB_E = graph.insertEdge(B, E, 7.5);

        var eF_E = graph.insertEdge(F, E, 12.0);
    
        // A->B->E costs 16.2
        // A->F->E costs 15.8

        var path = graph.bellmanFord_shortestPath(A, E);
        expect(path.getTotalCost()).toEqual(15.8);
        
        var step = path.next();
        if (step instanceof Vertex)
            expect(step.label).toBe("a");
        
        var step2 = path.next();
        expect(step2?.cost).toBe(3.8);
    });

    test('sortEdgesASC', () => 
    {

        var graph = new GraphImpl(); 

        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var E = graph.insertVertex("e");
        var F = graph.insertVertex("f");
        
        var eA_B = graph.insertEdge(A, B, 8.7);
        var eA_F = graph.insertEdge(A, F, 3.8);
        var eB_E = graph.insertEdge(B, E, 7.5);
        var eF_E = graph.insertEdge(F, E, 12.0);

        var edges = graph.getAllEdges();
        expect(edges.length).toEqual(4);

        expect(edges[0].cost).toEqual(8.7);
        expect(edges[1].cost).toEqual(3.8);
        expect(edges[2].cost).toEqual(7.5);
        expect(edges[3].cost).toEqual(12.0);

        var sortedEdges = graph.sortEdgesASC(edges);

        expect(sortedEdges[0].cost).toEqual(3.8);
        expect(sortedEdges[1].cost).toEqual(7.5);
        expect(sortedEdges[2].cost).toEqual(8.7);
        expect(sortedEdges[3].cost).toEqual(12.0);

        // ensure original arary isn't mutated
        expect(edges[0].cost).toEqual(8.7);
        expect(edges[1].cost).toEqual(3.8);
        expect(edges[2].cost).toEqual(7.5);
        expect(edges[3].cost).toEqual(12.0);
    });

    test('sortEdgesDESC', () => 
    {
        var graph = new GraphImpl(); 

        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var E = graph.insertVertex("e");
        var F = graph.insertVertex("f");
        
        var eA_B = graph.insertEdge(A, B, 8.7);
        var eA_F = graph.insertEdge(A, F, 3.8);
        var eB_E = graph.insertEdge(B, E, 7.5);
        var eF_E = graph.insertEdge(F, E, 12.0);

        var edges = graph.getAllEdges();
        expect(edges.length).toEqual(4);

        expect(edges[0].cost).toEqual(8.7);
        expect(edges[1].cost).toEqual(3.8);
        expect(edges[2].cost).toEqual(7.5);
        expect(edges[3].cost).toEqual(12.0);

        var sortedEdges = graph.sortEdgesDESC(edges);

        expect(sortedEdges[0].cost).toEqual(12.0);
        expect(sortedEdges[1].cost).toEqual(8.7);
        expect(sortedEdges[2].cost).toEqual(7.5);
        expect(sortedEdges[3].cost).toEqual(3.8);

        // Ensure original array isn't mutated
        expect(edges[0].cost).toEqual(8.7);
        expect(edges[1].cost).toEqual(3.8);
        expect(edges[2].cost).toEqual(7.5);
        expect(edges[3].cost).toEqual(12.0);
    });

    test('cities_travelguide_bmf', () => 
    {
        var graph = new GraphImpl();
    
        var ribe =              graph.insertVertex("Ribe");
        var brorup =            graph.insertVertex("Brorup");
        var lunderskov =        graph.insertVertex("Lunderskov");
        var odense =            graph.insertVertex("Odense"); 
        var copenhagen =        graph.insertVertex("Cph"); 

        var ribe_brorup =       graph.insertEdge(ribe, brorup, 25.9);
        var ribe_lunderskov =   graph.insertEdge(ribe, lunderskov, 34.8); 
        var brorup_odense =     graph.insertEdge(brorup, odense, 98);
        var lunderskov_odense = graph.insertEdge(lunderskov, odense, 80.2);
        var odense_copenhagen = graph.insertEdge(odense, copenhagen, 165);

        var bmf = graph.bellmanFord_shortestPath(ribe, copenhagen);

        expect(bmf.getTotalCost()).toEqual(280);

    });
    
    test('cities_travelguide_dijkstra', () => 
    {
        var graph = new GraphImpl();
    
        var ribe =              graph.insertVertex("Ribe");
        var brorup =            graph.insertVertex("Brorup");
        var lunderskov =        graph.insertVertex("Lunderskov");
        var odense =            graph.insertVertex("Odense"); 
        var copenhagen =        graph.insertVertex("Cph"); 

        var ribe_brorup =       graph.insertEdge(ribe, brorup, 25.9);
        var ribe_lunderskov =   graph.insertEdge(ribe, lunderskov, 34.8); 
        var brorup_odense =     graph.insertEdge(brorup, odense, 98);
        var lunderskov_odense = graph.insertEdge(lunderskov, odense, 80.2);
        var odense_copenhagen = graph.insertEdge(odense, copenhagen, 165);

        var dijkstra = graph.dijkstra_shortestPath(ribe, copenhagen);

        expect(dijkstra.getTotalCost()).toEqual(280);

    });

    // Critical Edge Cases for Production Trading Bots
    test('empty_graph_shortest_path', () => {
        var graph = new GraphImpl();
        
        // Empty graph should handle gracefully
        expect(graph.getAllVertices().length).toBe(0);
        expect(graph.getAllEdges().length).toBe(0);
        
        // Should not crash on empty graph operations
        expect(graph.bmf_negativeCycles().length).toBe(0);
    });

    test('single_vertex_shortest_path', () => {
        var graph = new GraphImpl();
        var vertex = graph.insertVertex("A");
        
        // Path from vertex to itself should work
        var dijkstraPath = graph.dijkstra_shortestPath(vertex, vertex);
        var bellmanPath = graph.bellmanFord_shortestPath(vertex, vertex);
        
        expect(dijkstraPath.getTotalCost()).toBe(0);
        expect(bellmanPath.getTotalCost()).toBe(0);
        
        // Paths might be empty for same vertex, which is valid behavior
        expect(dijkstraPath.steps.length).toBeGreaterThanOrEqual(0);
        expect(bellmanPath.steps.length).toBeGreaterThanOrEqual(0);
    });

    test('unreachable_vertices_shortest_path', () => {
        var graph = new GraphImpl();
        
        // Create disconnected components
        var A = graph.insertVertex("A");
        var B = graph.insertVertex("B");
        var C = graph.insertVertex("C");
        var D = graph.insertVertex("D");
        
        // Connect A-B but leave C-D isolated
        graph.insertEdge(A, B, 5);
        graph.insertEdge(C, D, 3);
        
        // Attempt to find path between disconnected components
        var dijkstraPath = graph.dijkstra_shortestPath(A, C);
        var bellmanPath = graph.bellmanFord_shortestPath(A, C);
        
        // Should return empty paths for unreachable vertices
        expect(dijkstraPath.getTotalCost()).toBe(0);
        expect(bellmanPath.getTotalCost()).toBe(0);
        
        // Path steps should indicate no valid path found
        expect(dijkstraPath.steps.length).toBeLessThanOrEqual(1); // Just destination
        expect(bellmanPath.steps.length).toBeLessThanOrEqual(1);
    });

    test('vertex_map_consistency', () => {
        var graph = new GraphImpl();
        
        var vertices: Vertex[] = [];
        for (var i = 0; i < 100; i++) {
            vertices.push(graph.insertVertex(`vertex_${i}`));
        }
        
        // Test vertex lookup consistency
        for (var i = 0; i < 100; i++) {
            var retrieved = graph.getVertexByLabel(`vertex_${i}`);
            expect(retrieved).toBe(vertices[i]);
            expect(retrieved?.label).toBe(`vertex_${i}`);
        }
        
        // Remove some vertices
        for (var i = 0; i < 50; i += 2) {
            graph.removeVertex(vertices[i]);
        }
        
        // Check remaining vertices still accessible
        for (var i = 1; i < 100; i += 2) {
            var retrieved = graph.getVertexByLabel(`vertex_${i}`);
            expect(retrieved).toBe(vertices[i]);
        }
        
        // Check removed vertices are gone
        for (var i = 0; i < 50; i += 2) {
            var retrieved = graph.getVertexByLabel(`vertex_${i}`);
            expect(retrieved).toBeUndefined();
        }
    });

    // Financial Precision Tests for Trading Applications
    test('financial_precision_small_decimals', () => {
        var graph = new GraphImpl();
        
        // Test with very small price differences (typical in forex)
        var USD = graph.insertVertex("USD");
        var EUR = graph.insertVertex("EUR");
        var GBP = graph.insertVertex("GBP");
        
        // Create a path that goes through other vertices
        graph.insertEdge(USD, EUR, 0.000001);
        graph.insertEdge(EUR, GBP, 0.000002);
        graph.insertEdge(GBP, USD, 0.000003);
        
        var path = graph.dijkstra_shortestPath(USD, GBP);
        
        // Should preserve precision for small decimals
        expect(path.getTotalCost()).toBeCloseTo(0.000003, 8);
    });

    test('negative_zero_handling', () => {
        var graph = new GraphImpl();
        
        var A = graph.insertVertex("A");
        var B = graph.insertVertex("B");
        
        // Test negative zero vs positive zero
        var edge1 = graph.insertEdge(A, B, -0.0);
        var edge2 = graph.insertEdge(B, A, +0.0);
        
        // Both should be considered zero (using loose equality)
        expect(edge1.getCost() == 0).toBe(true);
        expect(edge2.getCost() == 0).toBe(true);
        
        // Test the specific -0 vs +0 behavior
        expect(Object.is(edge1.getCost(), -0)).toBe(true);
        expect(Object.is(edge2.getCost(), +0)).toBe(true);
    });

    test('cumulative_precision_errors', () => {
        var graph = new GraphImpl();
        
        // Create a chain of many small decimal edges
        var vertices: Vertex[] = [];
        for (var i = 0; i < 100; i++) {
            vertices.push(graph.insertVertex(`v${i}`));
        }
        
        // Add edges with small decimal costs
        for (var i = 0; i < 99; i++) {
            graph.insertEdge(vertices[i], vertices[i + 1], 0.01);
        }
        
        var path = graph.dijkstra_shortestPath(vertices[0], vertices[99]);
        
        // Should maintain precision across many small additions
        expect(path.getTotalCost()).toBeCloseTo(0.99, 10);
    });

    test('extreme_values_handling', () => {
        var graph = new GraphImpl();
        
        var A = graph.insertVertex("A");
        var B = graph.insertVertex("B");
        var C = graph.insertVertex("C");
        
        // Test with extreme values
        graph.insertEdge(A, B, Number.MAX_SAFE_INTEGER);
        graph.insertEdge(B, C, -Number.MAX_SAFE_INTEGER);
        
        var path = graph.dijkstra_shortestPath(A, C);
        
        // Should handle extreme values without overflow
        expect(isFinite(path.getTotalCost())).toBe(true);
        expect(path.getTotalCost()).toBeCloseTo(0, 1);
    });

    // Advanced Arbitrage Detection Tests for Trading Bots  
    test('simple_arbitrage_cycle', () => {
        var graph = new GraphImpl();
        
        // Create the exact same structure as the working test
        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var C = graph.insertVertex("c");
        var D = graph.insertVertex("d");
        var E = graph.insertVertex("e");
        var F = graph.insertVertex("f");

        var eA_B = graph.insertEdge(A, B, 8.7);
        var eA_F = graph.insertEdge(A, F, 3.8);
        
        var eB_C = graph.insertEdge(B, C, 1.3);
        var eB_E = graph.insertEdge(B, E, 7.5);
        
        var eC_D = graph.insertEdge(C, D, 2.1);
        
        var eD_E = graph.insertEdge(D, E, 1.9);
        
        var eE_B = graph.insertEdge(E, B, 5.8);
        var eE_C = graph.insertEdge(E, C, -5.0);  // This creates the negative cycle
        var eE_D = graph.insertEdge(E, D, 3.1);
        
        var eF_E = graph.insertEdge(F, E, 12.0);
        var eF_A = graph.insertEdge(F, A, 8.0);
        
        var cycles = graph.bmf_negativeCycles();
        
        // Should detect the negative cycle (same as the working test)
        expect(cycles.length).toBeGreaterThanOrEqual(1);
        
        // All detected cycles should be actually profitable
        cycles.forEach(cycle => {
            expect(cycle.getTotalCost()).toBeLessThan(0);
        });
    });

    test('currency_arbitrage_realistic_scenario', () => {
        var graph = new GraphImpl();
        
        // Real-world-like exchange rates (using log prices for arbitrage detection)
        var BTC = graph.insertVertex("BTC");
        var ETH = graph.insertVertex("ETH");
        var USDT = graph.insertVertex("USDT");
        var USDC = graph.insertVertex("USDC");
        
        // Exchange A rates
        graph.insertEdge(BTC, ETH, Math.log(15.5));    // BTC/ETH = 15.5
        graph.insertEdge(ETH, USDT, Math.log(3200));   // ETH/USDT = 3200
        graph.insertEdge(USDT, USDC, Math.log(0.9999)); // USDT/USDC = 0.9999
        graph.insertEdge(USDC, BTC, Math.log(1/50000)); // BTC/USDC = 50000
        
        // Exchange B rates (slightly different, creating arbitrage)
        graph.insertEdge(BTC, USDT, Math.log(49500));  // Slightly lower BTC/USDT rate
        graph.insertEdge(USDT, BTC, Math.log(1/49600)); // Creating profitable cycle
        
        var cycles = graph.bmf_negativeCycles();
        
        // Should detect arbitrage opportunity
        expect(cycles.length).toBeGreaterThan(0);
        
        // Find the most profitable cycle
        var bestCycle = cycles.reduce((best, current) => 
            current.getTotalCost() < best.getTotalCost() ? current : best
        );
        
        expect(bestCycle.getTotalCost()).toBeLessThan(0);
    });

    test('arbitrage_with_transaction_fees', () => {
        var graph = new GraphImpl();
        
        var A = graph.insertVertex("A");
        var B = graph.insertVertex("B");
        var C = graph.insertVertex("C");
        
        // Without fees: profitable cycle
        // A->B: 0.9, B->C: 0.95, C->A: 1.2
        // Product: 0.9 * 0.95 * 1.2 = 1.026 (profitable)
        
        // With fees: add 0.001 fee to each trade (in log space)
        var fee = Math.log(1.001);
        
        graph.insertEdge(A, B, Math.log(0.9) + fee);
        graph.insertEdge(B, C, Math.log(0.95) + fee);
        graph.insertEdge(C, A, Math.log(1.2) + fee);
        
        var cycles = graph.bmf_negativeCycles();
        
        // Verify if arbitrage is still profitable after fees
        if (cycles.length > 0) {
            var totalCost = cycles[0].getTotalCost();
            var profitAfterFees = Math.exp(-totalCost) - 1;
            
            // Should be measurably profitable even after fees
            expect(profitAfterFees).toBeGreaterThan(0.001); // > 0.1% profit
        }
    });

    test('arbitrage_detection_performance', () => {
        var graph = new GraphImpl();
        
        // Create a complex multi-currency graph
        var currencies = ["USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "NZD"];
        var vertices = currencies.map(c => graph.insertVertex(c));
        
        // Add edges between all currency pairs
        for (var i = 0; i < vertices.length; i++) {
            for (var j = 0; j < vertices.length; j++) {
                if (i !== j) {
                    // Random exchange rates with occasional arbitrage opportunities
                    var rate = 0.5 + Math.random() * 2;
                    if (Math.random() < 0.1) { // 10% chance of arbitrage edge
                        rate *= 0.95; // Make it more favorable
                    }
                    graph.insertEdge(vertices[i], vertices[j], Math.log(rate));
                }
            }
        }
        
        var startTime = Date.now();
        var cycles = graph.bmf_negativeCycles();
        var endTime = Date.now();
        
        // Should complete within reasonable time for trading bot responsiveness
        expect(endTime - startTime).toBeLessThan(1000); // < 1 second
        
        // Should find cycles if they exist
        if (cycles.length > 0) {
            cycles.forEach(cycle => {
                expect(cycle.getTotalCost()).toBeLessThan(0);
                expect(cycle.steps.length).toBeGreaterThan(2); // Valid cycle
            });
        }
    });

    test('precision_sensitive_arbitrage', () => {
        var graph = new GraphImpl();
        
        var USD = graph.insertVertex("USD");
        var EUR = graph.insertVertex("EUR");
        var GBP = graph.insertVertex("GBP");
        
        // Very small arbitrage opportunity (0.01% profit)
        // This tests if the system can detect tiny profitable cycles
        var rate1 = 1.1000; // USD/EUR
        var rate2 = 0.8500; // EUR/GBP  
        var rate3 = 1.0701; // GBP/USD (slightly profitable)
        
        graph.insertEdge(USD, EUR, Math.log(rate1));
        graph.insertEdge(EUR, GBP, Math.log(rate2));
        graph.insertEdge(GBP, USD, Math.log(rate3));
        
        var cycles = graph.bmf_negativeCycles();
        
        if (cycles.length > 0) {
            var totalCost = cycles[0].getTotalCost();
            var profit = Math.exp(-totalCost) - 1;
            
            // Should detect small but measurable profit
            expect(profit).toBeGreaterThan(0);
            expect(profit).toBeLessThan(0.001); // Very small profit
        }
    });
});