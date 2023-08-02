"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edge = void 0;
class Edge {
    /**
     *
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.cost = -1;
    }
    getCost() {
        if (Number.isFinite(this.cost)) {
            return this.cost;
        }
        else {
            return this.obj.getCost();
        }
    }
    setCost(cost) { this.cost = cost; }
    getPrev() { return this.prev; }
    setPrev(p) { this.prev = p; }
    getObj() { return this.obj; }
    setObj(obj) { this.obj = obj; }
}
exports.Edge = Edge;
