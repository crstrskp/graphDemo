"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vertex = void 0;
var Vertex = /** @class */ (function () {
    function Vertex(label) {
        this.connectedEdges = new Array();
        this.label = label;
        this.visited = false;
    }
    Vertex.prototype.setLabel = function (s) { this.label = s; };
    Vertex.prototype.isAdjacent = function (v) {
        this.connectedEdges.forEach(function (element) {
            console.log("this element is connected to: ", element.start.label, " and: ", element.end.label);
            if (element.start == v || element.end == v)
                return true;
        });
        return false;
    };
    return Vertex;
}());
exports.Vertex = Vertex;
//# sourceMappingURL=Vertex.js.map