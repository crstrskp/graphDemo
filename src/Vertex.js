"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertex = void 0;
class Vertex {
    setLabel(s) { this.label = s; }
    getLabel() { return this.label; }
    constructor(label) {
        this.label = label;
        this.visited = false;
        this.cost = 0;
    }
    updateCost() {
    }
    setCost(cost) { this.cost = cost; }
    getCost() { return this.cost; }
    getObject() { return this.object; }
    getPrev() { return this.prev; }
    setPrev(e) { this.prev = e; }
}
exports.Vertex = Vertex;
