/**
 * @fileoverview High-performance TypeScript graph algorithms library optimized for trading bots and arbitrage detection.
 * 
 * This library provides production-ready graph data structures and algorithms with:
 * - O(V log V) Dijkstra's shortest path algorithm using priority queues
 * - Bellman-Ford algorithm with negative cycle detection for arbitrage
 * - Thread-safe implementations for concurrent trading strategies
 * - Real-time market data processing with batched updates
 * - Comprehensive test coverage for financial precision
 * 
 * @example
 * ```typescript
 * import { GraphImpl } from '@crstrskp/graph';
 * 
 * const graph = new GraphImpl();
 * const usd = graph.insertVertex("USD");
 * const eur = graph.insertVertex("EUR");
 * graph.insertEdge(usd, eur, 0.85);
 * 
 * const path = graph.dijkstra_shortestPath(usd, eur);
 * console.log(`Exchange rate: ${path.getTotalCost()}`);
 * ```
 * 
 * @author Jesper Tjørnelund
 * @version 1.0.0
 * @license MIT
 */

import { GraphImpl } from './GraphImpl';
import { ThreadSafeGraphImpl } from './ThreadSafeGraphImpl';
import { RealTimeGraphImpl } from './RealTimeGraphImpl';
import { Vertex } from './Vertex';
import { Path } from './Path';
import { Edge } from './Edge';
import { PriorityQueue } from './PriorityQueue';

/**
 * Core graph implementation with optimized algorithms.
 * Use this for most standard graph operations.
 */
export { GraphImpl };

/**
 * Thread-safe graph wrapper for concurrent trading strategies.
 * Use this when multiple threads need to access the same graph.
 */
export { ThreadSafeGraphImpl };

/**
 * Real-time graph with market data streaming capabilities.
 * Use this for live trading applications with continuous price updates.
 */
export { RealTimeGraphImpl };

/**
 * Graph vertex (node) representation.
 */
export { Vertex };

/**
 * Path through the graph with cost calculation.
 */
export { Path };

/**
 * Graph edge with cost and metadata support.
 */
export { Edge };

/**
 * High-performance min-heap priority queue.
 * Used internally by Dijkstra's algorithm.
 */
export { PriorityQueue };