"use strict";
exports.__esModule = true;
exports.Edge = void 0;
var Edge = /** @class */ (function () {
    /**
     *
     */
    function Edge(start, end) {
        this.start = start;
        this.end = end;
        this.cost = -1;
    }
    Edge.prototype.getCost = function () {
        if (Number.isFinite(this.cost)) {
            return this.cost;
        }
        else {
            return this.obj.getCost();
        }
    };
    Edge.prototype.setCost = function (cost) { this.cost = cost; };
    Edge.prototype.getPrev = function () { return this.prev; };
    Edge.prototype.setPrev = function (p) { this.prev = p; };
    return Edge;
}());
exports.Edge = Edge;
