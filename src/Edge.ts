import Vertex from "./Vertex";

// Represents an edge in the graph.
class Edge {
    public dest: Vertex;
    public cost: number;

    constructor(_dest: Vertex, _cost: number) {
        this.dest = _dest;
        this.cost = _cost;
    }
}

export default Edge;

