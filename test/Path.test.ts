import { GraphImpl } from '../src/GraphImpl';
import { Path } from '../src/Path';
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
   

        var path = new Path(A);
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
   
        
        var path = new Path(A);
        path.addStep(eA_B);
        path.addStep(B);
        path.addStep(eB_E);
        path.addStep(E);

        expect(path.next()).toBe(A);
        expect(path.next()).toBe(eA_B);
        expect(path.next()).toBe(B);
        expect(path.next()).toBe(eB_E);
        expect(path.next()).toBe(E);
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
   

        var path = new Path(A);
        path.addStep(eA_B);
        path.addStep(B);
        path.addStep(eB_E);
        path.addStep(E);

        expect(path.peek()).toBe(A);
        expect(path.next()).toBe(A);
        expect(path.peek()).toBe(eA_B);
    });
});
