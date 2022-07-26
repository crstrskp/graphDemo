"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edge = void 0;
var Edge = /** @class */ (function () {
    /**
     *
     */
    function Edge(start, end) {
        this.start = start;
        this.end = end;
        this.cost = this.getCost();
    }
    Edge.prototype.getCost = function () {
        return 1;
    };
    /**
     * this is a debug method, as all costs should be set from pricemaps and fees.
     * @param cost weight of the edge
     */
    Edge.prototype.setCost = function (cost) {
        this.cost = cost;
    };
    return Edge;
}());
exports.Edge = Edge;
//# sourceMappingURL=Edge.js.map