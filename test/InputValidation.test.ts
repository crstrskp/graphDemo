import { GraphImpl } from '../src/GraphImpl';
import { Vertex } from '../src/Vertex';
import { Edge } from '../src/Edge';
import { Path } from '../src/Path';

describe('InputValidation_testSuite', () => {
    // Null/Undefined Input Validation - Critical for Production Stability
    test('null_undefined_vertex_operations', () => {
        var graph = new GraphImpl();
        
        // Test null vertex lookup
        expect(graph.getVertexByLabel(null as any)).toBeUndefined();
        expect(graph.getVertexByLabel(undefined as any)).toBeUndefined();
        expect(graph.getVertexByLabel("")).toBeUndefined();
        
        // Test insertVertex with null/undefined
        expect(() => graph.insertVertex(null)).not.toThrow();
        expect(() => graph.insertVertex(undefined)).not.toThrow();
        
        var nullVertex = graph.insertVertex(null);
        var undefinedVertex = graph.insertVertex(undefined);
        
        expect(nullVertex).toBeDefined();
        expect(undefinedVertex).toBeDefined();
    });

    test('null_undefined_edge_operations', () => {
        var graph = new GraphImpl();
        var v1 = graph.insertVertex("A");
        var v2 = graph.insertVertex("B");
        
        // Test insertEdge with null/undefined costs
        expect(() => graph.insertEdge(v1, v2, null)).not.toThrow();
        expect(() => graph.insertEdge(v1, v2, undefined)).not.toThrow();
        
        var nullEdge = graph.insertEdge(v1, v2, null);
        var undefinedEdge = graph.insertEdge(v1, v2, undefined);
        
        // Should handle gracefully with default behavior
        expect(nullEdge.getCost()).toBeDefined();
        expect(undefinedEdge.getCost()).toBeDefined();
        expect(isFinite(nullEdge.getCost())).toBe(true);
        expect(isFinite(undefinedEdge.getCost())).toBe(true);
    });

    test('null_undefined_shortest_path', () => {
        var graph = new GraphImpl();
        var v1 = graph.insertVertex("A");
        var v2 = graph.insertVertex("B");
        graph.insertEdge(v1, v2, 5);
        
        // Test with null vertices - Dijkstra should throw, Bellman-Ford has different behavior
        expect(() => graph.dijkstra_shortestPath(null as any, v2)).toThrow();
        expect(() => graph.dijkstra_shortestPath(v1, null as any)).toThrow();
        expect(() => graph.dijkstra_shortestPath(null as any, null as any)).toThrow();
        
        // Bellman-Ford might handle null differently - test actual behavior
        var result1, result2, result3;
        expect(() => { result1 = graph.bellmanFord_shortestPath(null as any, v2); }).not.toThrow();
        expect(() => { result2 = graph.bellmanFord_shortestPath(v1, null as any); }).not.toThrow();
        expect(() => { result3 = graph.bellmanFord_shortestPath(null as any, null as any); }).not.toThrow();
    });

    test('invalid_graph_structure_handling', () => {
        var graph = new GraphImpl();
        
        // Test operations on empty graph
        expect(() => graph.bmf_negativeCycles()).not.toThrow();
        expect(graph.bmf_negativeCycles().length).toBe(0);
        
        // Test with vertices that don't exist in graph
        var orphanVertex = new Vertex("orphan");
        var validVertex = graph.insertVertex("valid");
        
        expect(() => graph.dijkstra_shortestPath(orphanVertex, validVertex)).not.toThrow();
        expect(() => graph.bellmanFord_shortestPath(orphanVertex, validVertex)).not.toThrow();
    });

    // NaN and Infinity Handling - Critical for Financial Applications
    test('nan_infinity_edge_costs', () => {
        var graph = new GraphImpl();
        var v1 = graph.insertVertex("A");
        var v2 = graph.insertVertex("B");
        var v3 = graph.insertVertex("C");
        
        // Test with NaN costs
        var nanEdge = graph.insertEdge(v1, v2, NaN);
        expect(isNaN(nanEdge.getCost())).toBe(true);
        
        // Test with Infinity costs
        var infEdge = graph.insertEdge(v2, v3, Infinity);
        var negInfEdge = graph.insertEdge(v3, v1, -Infinity);
        
        expect(infEdge.getCost()).toBe(Infinity);
        expect(negInfEdge.getCost()).toBe(-Infinity);
        
        // Algorithms should handle gracefully without crashing
        expect(() => graph.dijkstra_shortestPath(v1, v3)).not.toThrow();
        expect(() => graph.bellmanFord_shortestPath(v1, v3)).not.toThrow();
        expect(() => graph.bmf_negativeCycles()).not.toThrow();
    });

    test('malformed_vertex_labels', () => {
        var graph = new GraphImpl();
        
        // Test with various malformed labels
        var vertices = [
            graph.insertVertex(""),           // empty string
            graph.insertVertex("   "),        // whitespace
            graph.insertVertex("\n\t"),       // newlines/tabs
            graph.insertVertex(0),            // number
            graph.insertVertex(false),        // boolean
            graph.insertVertex({}),           // object
            graph.insertVertex([]),           // array
        ];
        
        // All should be created successfully
        expect(vertices.length).toBe(7);
        vertices.forEach(v => expect(v).toBeDefined());
        
        // Should be able to retrieve all vertices
        expect(graph.getAllVertices().length).toBe(7);
    });

    // Path Edge Cases
    test('path_edge_cases', () => {
        var path = new Path();
        
        // Test empty path operations
        expect(path.getTotalCost()).toBe(0);
        expect(path.next()).toBeUndefined();
        expect(path.peek()).toBeUndefined();
        
        // Test path with null steps
        expect(() => path.addStep(null as any)).not.toThrow();
        expect(() => path.addStep(undefined as any)).not.toThrow();
        
        // Should handle gracefully
        expect(path.steps.length).toBeGreaterThan(0);
        expect(() => path.getTotalCost()).not.toThrow();
    });

    // Memory Safety - Prevent Crashes in Long-Running Trading Bots
    test('circular_reference_handling', () => {
        var graph = new GraphImpl();
        
        var v1 = graph.insertVertex("A");
        var v2 = graph.insertVertex("B");
        
        // Create self-referencing edges
        var selfEdge = graph.insertEdge(v1, v1, 5);
        
        // Should handle self-loops without infinite loops
        expect(() => graph.dijkstra_shortestPath(v1, v1)).not.toThrow();
        expect(() => graph.bellmanFord_shortestPath(v1, v1)).not.toThrow();
        
        var path = graph.dijkstra_shortestPath(v1, v1);
        expect(path.getTotalCost()).toBeDefined();
        expect(isFinite(path.getTotalCost())).toBe(true);
    });

    test('edge_removal_consistency', () => {
        var graph = new GraphImpl();
        
        var v1 = graph.insertVertex("A");
        var v2 = graph.insertVertex("B");
        var edge = graph.insertEdge(v1, v2, 5);
        
        // Remove edge
        graph.removeEdge(edge);
        
        // Verify edge is gone
        expect(graph.getAllEdges()).not.toContain(edge);
        
        // Should not crash when removing already removed edge
        expect(() => graph.removeEdge(edge)).not.toThrow();
        
        // Should not crash when removing null edge
        expect(() => graph.removeEdge(null as any)).not.toThrow();
        expect(() => graph.removeEdge(undefined as any)).not.toThrow();
    });

    test('vertex_removal_edge_cleanup', () => {
        var graph = new GraphImpl();
        
        var v1 = graph.insertVertex("A");
        var v2 = graph.insertVertex("B");
        var v3 = graph.insertVertex("C");
        
        var e1 = graph.insertEdge(v1, v2, 5);
        var e2 = graph.insertEdge(v2, v3, 3);
        var e3 = graph.insertEdge(v1, v3, 8);
        
        var initialEdgeCount = graph.getAllEdges().length;
        
        // Remove vertex - should clean up incident edges
        graph.removeVertex(v2);
        
        var finalEdgeCount = graph.getAllEdges().length;
        
        // Should have removed edges incident to v2
        expect(finalEdgeCount).toBeLessThan(initialEdgeCount);
        expect(graph.getAllEdges()).not.toContain(e1);
        expect(graph.getAllEdges()).not.toContain(e2);
        expect(graph.getAllEdges()).toContain(e3); // Should remain
        
        // Verify vertex is gone from lookup
        expect(graph.getVertexByLabel("B")).toBeUndefined();
    });
});