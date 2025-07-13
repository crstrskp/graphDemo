import { PriorityQueue } from '../src/PriorityQueue';
import { Vertex } from '../src/Vertex';

describe('PriorityQueue_testSuite', () => {
    test('basic_operations', () => {
        var pq = new PriorityQueue<string>();
        
        expect(pq.isEmpty()).toBe(true);
        
        pq.enqueue("item1", 5);
        pq.enqueue("item2", 1);
        pq.enqueue("item3", 3);
        
        expect(pq.isEmpty()).toBe(false);
        
        expect(pq.dequeue()).toBe("item2"); // priority 1
        expect(pq.dequeue()).toBe("item3"); // priority 3
        expect(pq.dequeue()).toBe("item1"); // priority 5
        
        expect(pq.isEmpty()).toBe(true);
        expect(pq.dequeue()).toBeUndefined();
    });

    // Heap Property Validation - Critical for Dijkstra Performance
    test('heap_property_validation', () => {
        var pq = new PriorityQueue<number>();
        
        // Add items in random order
        var items = [15, 3, 17, 2, 8, 12, 9, 1, 6, 4];
        var priorities = [15, 3, 17, 2, 8, 12, 9, 1, 6, 4];
        
        for (var i = 0; i < items.length; i++) {
            pq.enqueue(items[i], priorities[i]);
        }
        
        // Extract all items - should come out in priority order
        var extracted: number[] = [];
        while (!pq.isEmpty()) {
            extracted.push(pq.dequeue()!);
        }
        
        // Verify sorted order (min-heap)
        for (var i = 1; i < extracted.length; i++) {
            expect(extracted[i]).toBeGreaterThanOrEqual(extracted[i-1]);
        }
        
        expect(extracted).toEqual([1, 2, 3, 4, 6, 8, 9, 12, 15, 17]);
    });

    // Performance Stress Test - Critical for Trading Bot Responsiveness  
    test('performance_stress_test', () => {
        var pq = new PriorityQueue<string>();
        
        var start = Date.now();
        
        // Enqueue 10,000 items
        for (var i = 0; i < 10000; i++) {
            pq.enqueue(`item_${i}`, Math.random() * 1000);
        }
        
        var enqueueTime = Date.now() - start;
        
        start = Date.now();
        
        // Dequeue all items
        var count = 0;
        while (!pq.isEmpty()) {
            pq.dequeue();
            count++;
        }
        
        var dequeueTime = Date.now() - start;
        
        expect(count).toBe(10000);
        
        // Performance assertions - should be sub-second for 10k operations
        expect(enqueueTime).toBeLessThan(1000); // 1 second max
        expect(dequeueTime).toBeLessThan(1000); // 1 second max
        
        // Verify O(log n) average case
        expect(enqueueTime / 10000).toBeLessThan(0.1); // < 0.1ms per operation
        expect(dequeueTime / 10000).toBeLessThan(0.1); // < 0.1ms per operation
    });

    // Duplicate Priority Handling - Common in Financial Data
    test('duplicate_priorities', () => {
        var pq = new PriorityQueue<string>();
        
        pq.enqueue("first", 5);
        pq.enqueue("second", 5);
        pq.enqueue("third", 5);
        pq.enqueue("fourth", 3);
        pq.enqueue("fifth", 7);
        
        // Lower priority should come first
        expect(pq.dequeue()).toBe("fourth"); // priority 3
        
        // Items with same priority should be handled consistently
        var item1 = pq.dequeue();
        var item2 = pq.dequeue();
        var item3 = pq.dequeue();
        
        expect([item1, item2, item3]).toContain("first");
        expect([item1, item2, item3]).toContain("second");
        expect([item1, item2, item3]).toContain("third");
        
        expect(pq.dequeue()).toBe("fifth"); // priority 7
    });

    // Vertex Type Integration - Ensures Type Safety with Graph Operations
    test('vertex_type_integration', () => {
        var pq = new PriorityQueue<Vertex>();
        
        var v1 = new Vertex("A");
        var v2 = new Vertex("B");
        var v3 = new Vertex("C");
        
        pq.enqueue(v1, 10);
        pq.enqueue(v2, 5);
        pq.enqueue(v3, 15);
        
        expect(pq.dequeue()).toBe(v2); // lowest priority
        expect(pq.dequeue()).toBe(v1);
        expect(pq.dequeue()).toBe(v3); // highest priority
    });

    // Memory Efficiency Test - Prevents Memory Leaks in Long-Running Trading Bots
    test('memory_efficiency', () => {
        var pq = new PriorityQueue<string>();
        
        // Simulate high-frequency trading scenario
        for (var cycle = 0; cycle < 100; cycle++) {
            // Add batch of market updates
            for (var i = 0; i < 100; i++) {
                pq.enqueue(`update_${cycle}_${i}`, Math.random());
            }
            
            // Process batch
            for (var i = 0; i < 100; i++) {
                pq.dequeue();
            }
            
            // Queue should be empty after each cycle
            expect(pq.isEmpty()).toBe(true);
        }
        
        // No memory leaks - queue should still be functional
        pq.enqueue("test", 1);
        expect(pq.dequeue()).toBe("test");
    });

    // Edge Case: Zero and Negative Priorities
    test('zero_and_negative_priorities', () => {
        var pq = new PriorityQueue<string>();
        
        pq.enqueue("negative", -5);
        pq.enqueue("zero", 0);
        pq.enqueue("positive", 5);
        
        expect(pq.dequeue()).toBe("negative"); // -5 is lowest
        expect(pq.dequeue()).toBe("zero");     // 0 is middle
        expect(pq.dequeue()).toBe("positive"); // 5 is highest
    });

    // Edge Case: Single Item Operations
    test('single_item_operations', () => {
        var pq = new PriorityQueue<string>();
        
        pq.enqueue("only", 42);
        expect(pq.isEmpty()).toBe(false);
        
        expect(pq.dequeue()).toBe("only");
        expect(pq.isEmpty()).toBe(true);
        
        // Should handle empty operations gracefully
        expect(pq.dequeue()).toBeUndefined();
        expect(pq.isEmpty()).toBe(true);
    });
});