"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphDemo = void 0;
var Edge_1 = require("./Edge");
var GraphDemo = /** @class */ (function () {
    function GraphDemo() {
        this.vertices = new Array();
        this.edges = new Array();
        this.stack = new Array();
    }
    GraphDemo.prototype.addVertex = function (v) {
        this.vertices.push(v);
    };
    GraphDemo.prototype.addEdge = function (start, end) {
        var edge = new Edge_1.Edge(start, end);
        start.connectedEdges.push(edge);
        end.connectedEdges.push(edge);
        this.edges.push(edge);
    };
    GraphDemo.prototype.push = function (item) {
        this.stack.push(item);
    };
    GraphDemo.prototype.pop = function () {
        return this.stack.pop();
    };
    GraphDemo.prototype.peek = function () {
        return this.stack[this.stack.length - 1];
    };
    GraphDemo.prototype.isStackEmpty = function () {
        return this.stack.length < 1;
    };
    GraphDemo.prototype.getAdjUnivisitedVertex = function (vertex) {
        this.vertices.forEach(function (element) {
            if (vertex.isAdjacent(element))
                return element;
        });
        return undefined;
    };
    GraphDemo.prototype.depthFirstSearch = function () {
        console.log(" ------ DEPTH FIRST SEARCH ------ ");
        var v = this.vertices[0];
        v.visited = true;
        this.displayVertex(v);
        this.push(v);
        console.log(this.stack.length);
        while (this.stack.length > 0) {
            var a = this.peek();
            var univisitedVertex = this.getAdjUnivisitedVertex(a);
            console.log("something: ", univisitedVertex === null || univisitedVertex === void 0 ? void 0 : univisitedVertex.label);
            if (univisitedVertex == undefined) {
                this.pop();
            }
            else {
                univisitedVertex.visited = true;
                this.displayVertex(univisitedVertex);
                this.push(univisitedVertex);
            }
        }
        // reset all visited vertices
        this.vertices.forEach(function (element) {
            element.visited = false;
        });
    };
    GraphDemo.prototype.displayVertex = function (v) {
        console.log("displaying vertex: ", v);
    };
    return GraphDemo;
}());
exports.GraphDemo = GraphDemo;
//# sourceMappingURL=GraphDemo.js.map