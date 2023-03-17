"use strict";
exports.__esModule = true;
exports.Vertex = void 0;
var Vertex = /** @class */ (function () {
    function Vertex(label) {
        this.label = label;
        this.visited = false;
        this.cost = 0;
    }
    Vertex.prototype.setLabel = function (s) { this.label = s; };
    Vertex.prototype.getLabel = function () { return this.label; };
    Vertex.prototype.updateCost = function () {
        // find pool
        // update price ^^ 
        //timedAwait ?? this.object.UpdatePrice();
        // set cost to price ^^ 
        //this.cost = this.
    };
    Vertex.prototype.setCost = function (cost) { this.cost = cost; };
    Vertex.prototype.getCost = function () { return this.cost; };
    Vertex.prototype.getObject = function () { return this.object; };
    Vertex.prototype.getPrev = function () { return this.prev; };
    Vertex.prototype.setPrev = function (e) { this.prev = e; };
    return Vertex;
}());
exports.Vertex = Vertex;
