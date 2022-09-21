import Graph from "./Graph";





function main(): void {
    const g = new Graph();
    g.addEdge("A", "B", 15);
    g.addEdge("A", "D", 80);
    g.addEdge("B", "E", 10);
    g.addEdge("C", "A", 11);
    g.addEdge("D", "B", 25);
    g.addEdge("D", "C", 24);
    g.addEdge("E", "D", 47);

    g.dijkstra("A");
    g.printPath("D");

}

main();

