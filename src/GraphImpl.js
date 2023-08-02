"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphImpl = void 0;
const Edge_1 = require("./Edge");
const Vertex_1 = require("./Vertex");
const Path_1 = require("./Path");
class GraphImpl {
    constructor() {
        this.edges = [];
        this.vertices = [];
    }
    bellmanFord(src) {
        var vDists = new Map();
        this.vertices.forEach((v) => {
            vDists.set(v, Number.MAX_VALUE);
        });
        vDists.set(src, 0);
        for (var i = 0; i < this.vertices.length; i++) {
            for (var j = 0; j < this.edges.length; j++) {
                var start = this.edges[j].start;
                var end = this.edges[j].end;
                var cost = this.edges[j].getCost();
                var startCost = vDists.get(start);
                if (startCost + cost < vDists.get(end)) {
                    vDists.set(end, startCost + cost);
                    end.prev = this.edges[j];
                    this.edges[j].prev = start;
                }
            }
        }
        return vDists;
    }
    bellmanFord_shortestPath(src, dest) {
        var path = new Path_1.Path();
        path.addStep(dest);
        var bmf = this.bellmanFord(src);
        // this.bmf_print(bmf);
        var step = dest;
        while (step != undefined) {
            step = step.getPrev();
            path.addStep(step);
        }
        path.reverse();
        path.next(); // delete me - removes the first "dest" node, however this shouldn't be done like this! 
        return path;
    }
    bmf_print(bmf) {
        var output = "Node\tDistance from source\n";
        bmf.forEach((value, key) => {
            output += key.label + "\t\t" + value + "\n";
        });
        console.log(output);
    }
    bmf_negativeCycles() {
        var path = new Path_1.Path();
        var cycles = [];
        var vDists = this.bellmanFord(this.vertices[0]);
        for (var j = 0; j < this.edges.length; j++) {
            var start = this.edges[j].start;
            var end = this.edges[j].end;
            var cost = this.edges[j].getCost();
            var c = vDists.get(start) + cost;
            if (c < vDists.get(end)) {
                // console.log("Negative cycle detected at ", start.getLabel(), " -> ", end.getLabel());
                path.addStep(start);
                cycles.push(path);
                console.log("TODO - return actual path rather than just start node. ");
            }
        }
        return cycles;
    }
    dijkstra_shortestPath(src, dest) {
        var path = new Path_1.Path();
        var vDists = new Map();
        this.vertices.forEach((v) => {
            vDists.set(v.label, Number.MAX_VALUE);
        });
        vDists.set(src.label, 0);
        var unvisitedEdges = this.getIncidentStartEdges(src);
        unvisitedEdges = this.sortEdgesASC(unvisitedEdges);
        unvisitedEdges.forEach((e) => e.prev = src);
        while (unvisitedEdges.length > 0) {
            var currentCost = vDists.get(unvisitedEdges[0].start?.label) + unvisitedEdges[0].cost;
            // console.log("currentEdge: ",unvisitedEdges[0].start?.label+"->"+unvisitedEdges[0].end?.label, "nodeCost: ", vDists.get(unvisitedEdges[0].start?.label)!, "currentCost: ", currentCost);
            if (currentCost < vDists.get(unvisitedEdges[0].end.label)) {
                vDists.set(unvisitedEdges[0].end.label, currentCost);
                var node = this.getVertexByLabel(unvisitedEdges[0].end.label);
                if (node == undefined)
                    continue; // end of the line? 
                // console.log(node.label);
                node.prev = unvisitedEdges[0];
                var newEdges = this.getIncidentStartEdges(node);
                newEdges.forEach((e) => {
                    e.prev = node;
                    // console.log("added new edge from: ", e.start.label, " to ", e.end.label);
                    unvisitedEdges.push(e);
                });
            }
            // prepare for next iteration: 
            unvisitedEdges.shift();
            unvisitedEdges = this.sortEdgesASC(unvisitedEdges);
            // early termination
            if (unvisitedEdges[0] == undefined)
                continue;
        }
        if (dest.prev == undefined) {
            console.log("we did not find a path leading to destination");
            return path;
        }
        // console.log(vDists);
        // build path
        var step = dest;
        path.addStep(step);
        while (step != undefined) {
            step = step.getPrev();
            if (step instanceof Vertex_1.Vertex)
                path.addStep(step);
            if (step instanceof Edge_1.Edge)
                path.addStep(step);
        }
        path.reverse();
        // console.log(path.toString());
        return path;
    }
    getVertexByLabel(label) {
        var result = undefined;
        this.vertices.forEach((v) => {
            if (v.label == label)
                result = v;
        });
        return result;
    }
    getAllVertices() {
        var vertices = [];
        for (var i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] != null && this.vertices[i] != undefined) {
                vertices.push(this.vertices[i]);
            }
        }
        this.vertices = vertices;
        return this.vertices;
    }
    getAllEdges() {
        var edges = [];
        for (var i = 0; i < this.edges.length; i++) {
            var e = this.edges[i];
            if (e != null && e != undefined) {
                edges.push(e);
            }
        }
        this.edges = edges;
        return this.edges;
    }
    getIncidentEdges(v) {
        var incidentEdges = [];
        this.edges.forEach((edge) => {
            if (edge.end === v || edge.start === v)
                if (incidentEdges.includes(edge) == false)
                    incidentEdges.push(edge);
        });
        // console.log("incident edges for vertex {",v, "}:\n",incidentEdges);
        return incidentEdges;
    }
    getIncidentStartEdges(v) {
        var incidentEdges = [];
        this.edges.forEach((edge) => {
            if (edge.start === v)
                if (incidentEdges.includes(edge) == false)
                    incidentEdges.push(edge);
        });
        return incidentEdges;
    }
    getIncidentEndEdges(v) {
        var incidentEdges = [];
        this.edges.forEach((edge) => {
            if (edge.end === v)
                if (incidentEdges.includes(edge) == false)
                    incidentEdges.push(edge);
        });
        return incidentEdges;
    }
    getOpposite(v, e) {
        if (e.start === v)
            return e.end;
        else if (e.end === v)
            return e.start;
        else
            return undefined;
    }
    getVertices(e) {
        var vertices = [];
        vertices.push(e.start);
        vertices.push(e.end);
        return vertices;
    }
    getAdjacentVertices(v) {
        var edges = this.getIncidentEdges(v);
        var neighbors = [];
        edges.forEach((e) => {
            var opp = this.getOpposite(v, e);
            if (opp != undefined && !neighbors.includes(opp))
                neighbors.push(opp);
        });
        return neighbors;
    }
    areAdjacent(v, w) {
        var adj = false;
        for (var i = 0; i < this.edges.length; i++) {
            var e = this.edges[i];
            if (e.start === v && e.end === w)
                adj = true;
            else if (e.start === w && e.end === v)
                adj = true;
            else
                adj = false;
        }
        return adj;
    }
    insertVertex(o) {
        if (this.isOfTypeVertex(o)) {
            this.vertices.push(o);
            return o;
        }
        else {
            var v = new Vertex_1.Vertex(o);
            this.vertices.push(v);
            return v;
        }
    }
    isOfTypeVertex(input) {
        return input instanceof Vertex_1.Vertex;
    }
    insertEdge(v, w, o) {
        var e = new Edge_1.Edge(v, w);
        if (Number.isFinite(o)) {
            e.setCost(o);
        }
        else {
            e.obj = o;
        }
        this.edges.push(e);
        return e;
    }
    removeVertex(v) {
        var edges = this.getIncidentEdges(v);
        for (var i = 0; i < edges.length; i++) {
            this.removeEdge(edges[i]);
        }
        var i = this.vertices.indexOf(v);
        var removedElement = this.vertices.splice(i, 1);
    }
    removeEdge(e) {
        for (var i = 0; i < this.edges.length; i++) {
            if (this.edges[i] === e)
                delete this.edges[i];
        }
        this.getAllEdges(); // updates the this.edges array
    }
    /**
     *
     * @param edges list of edges to be sorted
     * @returns a new list of sorted edges
     */
    sortEdgesASC(edges) {
        var sortedArray = [];
        edges.forEach((e) => sortedArray.push(e));
        return sortedArray.sort((e1, e2) => {
            if (e1.cost > e2.cost)
                return 1;
            if (e1.cost < e2.cost)
                return -1;
            return 0;
        });
    }
    /**
     *
     * @param edges list of edges to be sorted
     * @returns a new list of sorted edges
     */
    sortEdgesDESC(edges) {
        var sortedArray = [];
        edges.forEach((e) => sortedArray.push(e));
        return sortedArray.sort((e1, e2) => {
            if (e1.cost < e2.cost)
                return 1;
            if (e1.cost > e2.cost)
                return -1;
            return 0;
        });
    }
}
exports.GraphImpl = GraphImpl;
