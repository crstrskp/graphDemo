"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const Edge_1 = require("./Edge");
const Vertex_1 = require("./Vertex");
class Path {
    constructor() {
        this.steps = [];
        this.totalCost = 0;
        this.toString = () => {
            var msg = "";
            this.steps.forEach((element) => {
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
    addStep(step) {
        // if (this.steps.includes(step)) return;
        this.steps.push(step);
        this.calculateTotalCost();
    }
    calculateTotalCost() {
        var cost = 0;
        this.steps.forEach((step) => {
            if (step instanceof Edge_1.Edge)
                cost += step.getCost();
        });
        this.totalCost = cost;
    }
    /** NOTE: alters collection!
     * Removes the first element of the steps list.
     * @returns the removed element
     */
    next() {
        return this.steps.shift();
    }
    peek() {
        return this.steps[0];
    }
    getTotalCost() {
        return this.totalCost;
    }
    /**NOTE: alters collection!
     * mutates the <steps> array
     */
    reverse() {
        this.steps.reverse();
    }
}
exports.Path = Path;
