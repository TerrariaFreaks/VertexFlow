import {MinPriorityQueue} from './priorityQueue'

export function prim(nodes, edges, startNodeId, isDirected){
    const startTime = performance.now()
    const steps = []

    if (isDirected){
        console.warn("Prim's algorithm needs an undirected graph")
    }

    const adjacency = {}
    const visited = new Set()
    const mstEdges = []

    nodes.forEach((node)=> {
        adjacency[node.id] = []
    });

    edges.forEach((edge)=> {
        const weight = edge.weight ?? 1
        adjacency[edge.source].push({
            node: edge.target,
            weight
        })

        adjacency[edge.target].push({
            node: edge.source,
            weight
        })
    });

    const pq = new MinPriorityQueue()

    visited.add(startNodeId)

    steps.push({
        type: "visit",
        nodeId: startNodeId
    })

    adjacency[startNodeId].forEach(({node, weight})=>{
        pq.insert(
            {from: startNodeId, to: node}, weight
        )
    });
    
    let totalCost = 0
    while (!pq.isEmpty()){
        const {value, priority} = pq.extractMin()
        const {from, to} = value

        if (visited.has(to)) continue;

        visited.add(to)
        mstEdges.push({from, to})
        totalCost += priority

        steps.push({
            type: "edge",
            from,
            to
        });

        steps.push({
            type: "visit",
            nodeId: to
        });

        adjacency[to].forEach(({node, weight})=> {
            if (!visited.has(node)){
                pq.insert(
                    {from: to, to: node}, weight
                )
            }
        });
    }
    const endTime = performance.now()
    const timeTaken = endTime - startTime
    return {
        steps,
        mstEdges,
        totalCost,
        visitedCount: visited.size,
        timeTaken
    }

}