// Graph class: evaluate shortest paths.
//
// CONSTRUCTION: with no parameters.
//
// ******************PUBLIC OPERATIONS**********************
// void addEdge( String v, String w, double cvw )
//                              --> Add additional edge
// void printPath( String w )   --> Print path after alg is run
// void unweighted( String s )  --> Single-source unweighted
// void dijkstra( String s )    --> Single-source weighted
// void negative( String s )    --> Single-source negative weighted
// void acyclic( String s )     --> Single-source acyclic
// ******************ERRORS*********************************
// Some error checking is performed to make sure graph is ok,
// and to make sure graph satisfies properties needed by each
// algorithm.  Exceptions are thrown if errors are detected.

import PriorityQueue from "priority-queue-typescript";
import Edge from "./Edge";
import Vertex from "./Vertex";
import Path from "./Path";

class Graph {
    public INFINITY: number = 1000000000;
    static INFINITY: number;
    private vertexMap = new Map<String, Vertex>();


    /**
    * Add a new edge to the graph.
    */
    public addEdge(sourceName: string, destName: string, cost: number): void {
        let v: Vertex = this.getVertex(sourceName);
        let w: Vertex = this.getVertex(destName);
        let newEge: Edge = new Edge(w, cost);
        v.adj.insert(newEge);

    }
    /**
    * Driver routine to handle unreachables and print total cost.
    * It calls recursive routine to print shortest path to
    * destNode after a shortest path algorithm has run.
    */
    public printPath(destName: string): void {
        let w: Vertex | undefined = this.vertexMap.get(destName);
        if (w == undefined)
            throw new Error("Destination vertex not found");
        else if (w.dist == this.INFINITY)
            console.log(destName + " is unreachable");
        else {
            console.log("(Cost is: " + w.dist + ") ");
            this.printPathRecurisive(w);
            console.log();
        }
    }

    /**
 * Recursive routine to print shortest path to dest
 * after running shortest path algorithm. The path
 * is known to exist.
 */
    private printPathRecurisive(dest: Vertex): void {
        if (dest.prev != null) {
            this.printPathRecurisive(dest.prev);
            console.log(" to ");
        }
        console.log(dest.name);
    }

    /**
* If vertexName is not present, add it to vertexMap.
* In either case, return the Vertex.
*/
    private getVertex(vertexName: string): Vertex {
        let v: Vertex | undefined = this.vertexMap.get(vertexName);
        if (v == undefined) {
            v = new Vertex(vertexName);
            this.vertexMap.set(vertexName, v);

        }
        return v;
    }

    /**
 * Initializes the vertex output info prior to running
 * any shortest path algorithm.
 */
    private clearAll(): void {
        for (var v of this.vertexMap.values()) {
            v.reset();
        }
    }
    public dijkstra(startName: string): void {
        let pq = new PriorityQueue<Path>();
        let start: Vertex = this.vertexMap.get(startName)!;

        if (start == undefined) {
            throw new Error("Start vertex not found");
        }

        this.clearAll();

        let newPath: Path = new Path(start, 0);
        pq.add(newPath);
        start.dist = 0;
        let nodesSeen: number = 0;

        while (!pq.empty() && nodesSeen < this.vertexMap.size) {
            let vrec: Path = pq.poll()!;
            let v: Vertex = vrec.dest;
            if (v.scratch != 0) {
                // already processed v
                continue;
            }
            v.scratch = 1;

            nodesSeen++;

            for (let x = 0; x < v.adj.size; x++) {
                let e = v.adj.findAt(x).data as unknown as Edge;
                let w: Vertex = e.dest;
                let cvw: number = e.cost;
                if (cvw < 0) {
                    throw new Error("Graph has negative edges");
                }
                if (w.dist > v.dist + cvw) {
                    w.dist = v.dist + cvw;
                    w.prev = v;
                    pq.add(new Path(w, w.dist));
                }

            }

        }



    }

}
export default Graph;