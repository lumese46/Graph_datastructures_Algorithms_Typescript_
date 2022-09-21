import Vertex from "./Vertex";

// Represents an entry in the priority queue for Dijkstra's algorithm.
class Path {
    public dest: Vertex;
    public cost: number;
    constructor(_dest: Vertex, _cost: number) {
        this.dest = _dest;
        this.cost = _cost;
    }
    compareTo(rhs: Path): number {
        let otherCost: number = rhs.cost;
        // is less than 
        if (this.cost < otherCost) {
            return -1;
        }// if is greater than
        else if (this.cost > otherCost) {
            return 1;
        }
        // if not less than then it is equal
        return 0;
    }
}
export default Path;
