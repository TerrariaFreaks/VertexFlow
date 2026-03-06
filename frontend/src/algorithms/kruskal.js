import { UnionFind } from "./unionFind";

export function kruskal(nodes, edges, isDirected){
    if (isDirected){
        alert("Kruskal's Algorithm needs an undirected graph")
    }
    const startTime = performance.now()
    const steps = []
    const mstEdges = []
    let totalCost = 0

    const nodeIds = nodes.map(node => node.id)
    const uf = new UnionFind(nodeIds)

    const sortedEdges = [...edges].sort(
        (a, b) => (a.weight ?? 1) - (b.weight ?? 1)
    )

    for (const edge of sortedEdges){
        const weight = edge.weight ?? 1

        steps.push({
            type: "edge",
            from: edge.source,
            to: edge.target
        });

        if (uf.union(edge.source, edge.target)){
            mstEdges.push({
                from: edge.source,
                to: edge.target
            })
            totalCost += weight
        }
    }
    const endTime = performance.now()
    const timeTaken = endTime - startTime
    return { steps, mstEdges, totalCost , visitedCount: mstEdges.length + 1, timeTaken}
}