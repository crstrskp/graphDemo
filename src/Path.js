"use strict";
exports.__esModule = true;
exports.Path = void 0;
var Edge_1 = require("./Edge");
var Vertex_1 = require("./Vertex");
var Path = /** @class */ (function () {
    function Path() {
        var _this = this;
        this.steps = [];
        this.totalCost = 0;
        this.toString = function () {
            var msg = "";
            _this.steps.forEach(function (element) {
                if (element instanceof Vertex_1.Vertex) {
                    msg += "Vertex: " + element.label + " cost: " + element.getCost() + "\n";
                }
                else if (element instanceof Edge_1.Edge) {
                    msg += "Edge from: " + element.start.label + " to: " + element.end.label + " cost: " + element.getCost() + ".\n";
                }
                else {
                    msg += "unknow type: " + element + "\n";
                }
            });
            return msg;
        };
    }
    Path.prototype.addStep = function (step) {
        // if (this.steps.includes(step)) return;
        this.steps.push(step);
        this.calculateTotalCost();
    };
    Path.prototype.calculateTotalCost = function () {
        var cost = 0;
        this.steps.forEach(function (step) {
            if (step instanceof Edge_1.Edge)
                cost += step.getCost();
        });
        this.totalCost = cost;
    };
    /** NOTE: alters collection!
     * Removes the first element of the steps list.
     * @returns the removed element
     */
    Path.prototype.next = function () {
        return this.steps.shift();
    };
    Path.prototype.peek = function () {
        return this.steps[0];
    };
    Path.prototype.getTotalCost = function () {
        return this.totalCost;
    };
    /**NOTE: alters collection!
     * mutates the <steps> array
     */
    Path.prototype.reverse = function () {
        this.steps.reverse();
    };
    return Path;
}());
exports.Path = Path;
