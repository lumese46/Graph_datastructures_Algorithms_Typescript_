import LinkedList from "singly-linked-list";
// Represents a vertex in the graph.
class Vertex {
    public name: string;   // Vertex name
    public adj: LinkedList; // Adjacent vertices
    public dist: number;   // Cost
    public prev: Vertex | null;   // Previous vertex on shortest path
    public scratch: number;// Extra variable used in algorithm

    constructor(nm: string) {
        this.name = nm;
        this.adj = new LinkedList();
        this.dist = 1000000000;
        this.prev = null;
        this.scratch = 0;
    }
    public reset(): void {
        this.dist = 1000000000;
        this.prev = null;
        this.scratch = 0;
    }


}
export default Vertex;


