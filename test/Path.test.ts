import { Vertex } from '../src/Vertex';
import { GraphImpl } from '../src/GraphImpl';
import { Path } from '../src/Path';
import { Edge } from '../src/Edge';

describe('Path_testSuite', () => 
{
    test('calculateTotalCost', () => 
    {
        var graph = new GraphImpl(); 

        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var E = graph.insertVertex("e");

        graph.getAllVertices().forEach((v) => 
        {
            v.cost = 0;
            v.visited = false; 
        });

        var eA_B = graph.insertEdge(A, B, 8.7);
        
        var eB_E = graph.insertEdge(B, E, 9.9);
   

        var path = new Path();
        path.addStep(A);
        path.addStep(eA_B);
        path.addStep(B);
        expect(path.getTotalCost()).toEqual(8.7);
        path.addStep(eB_E);
        expect(path.getTotalCost()).toEqual(18.6);
        path.addStep(E);
        expect(path.getTotalCost()).toEqual(18.6);

    });

    test('next', () => 
    {
        var graph = new GraphImpl(); 

        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var E = graph.insertVertex("e");

        var eA_B = graph.insertEdge(A, B, 8.7);
        
        var eB_E = graph.insertEdge(B, E, 7.5);
   
        var path = new Path();
        path.addStep(A);
        path.addStep(eA_B);
        path.addStep(B);
        path.addStep(eB_E);
        path.addStep(E);

        var step = path.next();
        
        if (step instanceof Vertex)
            expect(step.label).toBe(A.label);
        
        step = path.next();
        if (step instanceof Edge)
            expect(step.getCost()).toBe(eA_B.getCost());
            
        step = path.next();
        if (step instanceof Vertex)
            expect(step.label).toBe(B.label);
            
        step = path.next();
        if (step instanceof Edge)
            expect(step.getCost()).toBe(eB_E.getCost());

        step = path.next();
        if (step instanceof Vertex)
            expect(step.label).toBe(E.label);
    
        expect(path.next()).toBe(undefined);

    });

    test('peek', () => 
    {
        var graph = new GraphImpl(); 

        var A = graph.insertVertex("a");
        var B = graph.insertVertex("b");
        var E = graph.insertVertex("e");

        var eA_B = graph.insertEdge(A, B, 8.7);
        
        var eB_E = graph.insertEdge(B, E, 7.5);
   

        var path = new Path();
        path.addStep(A);
        path.addStep(eA_B);
        path.addStep(B);
        path.addStep(eB_E);
        path.addStep(E);

        var step = path.peek();

        if (step instanceof Vertex)
            expect(step.label).toBe(A.label);
        
        step = path.next();
        if (step instanceof Vertex)
            expect(step.label).toBe(A.label);
        
        step = path.peek();
        if (step instanceof Edge)
            expect(step?.getCost()).toBe(eA_B.getCost());
    });

    test('getTotalCost', () => 
    {
        var graph = new GraphImpl(); 

        var A = graph.insertVertex("A");
        var B = graph.insertVertex("B");
        var C = graph.insertVertex("C");
        var eA_B = graph.insertEdge(A, B, 8.7);
        
        var eB_C = graph.insertEdge(B, C, 7.5);
   
        var path = new Path();
        path.addStep(A);
        path.addStep(eA_B);
        path.addStep(B);
        path.addStep(eB_C);
        path.addStep(C);

        expect(path.getTotalCost()).toEqual(16.2);
    });

    test('reverse', () => 
    {
        var graph = new GraphImpl(); 

        var A = graph.insertVertex("A");
        var B = graph.insertVertex("B");
        var C = graph.insertVertex("C");
        var eA_B = graph.insertEdge(A, B, 8.7);
        
        var eB_C = graph.insertEdge(B, C, 7.5);
   
        var path = new Path();
        path.addStep(A);
        path.addStep(eA_B);
        path.addStep(B);
        path.addStep(eB_C);
        path.addStep(C);

        var step = path.peek();

        if (step instanceof Vertex)
            expect(step?.label).toBe(A.label);

        path.reverse();

        step = path.peek();
        if (step instanceof Vertex)
        expect(step?.label).toBe(C.label);
        
        path.reverse();
        
        step = path.peek();
        if (step instanceof Vertex)
            expect(step?.label).toBe(A.label);

    });

    test('iterator', () => {
        var graph = new GraphImpl();

        var v1 = graph.insertVertex("v1");
        var v2 = graph.insertVertex("v2");
        var v3 = graph.insertVertex("v3");
        var v4 = graph.insertVertex("v4");

        var e1 = graph.insertEdge(v1, v2, 1);
        var e2 = graph.insertEdge(v2, v3, 2);
        var e3 = graph.insertEdge(v3, v4, 3);

        var path = graph.dijkstra_shortestPath(v1, v4);

        var result = 0;

        for (const step of path.steps) 
        {
            if (step instanceof Edge)
            {
                result += step.getCost();   
            }
        }

        expect(result).toBe(6);
    })
});
