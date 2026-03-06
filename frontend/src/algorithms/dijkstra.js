import { MinPriorityQueue } from "./priorityQueue";

export function dijkstra(nodes, edges, startNodeId, isDirected){
    const startTime = performance.now()
    const steps = []

    const adjacency = {}
    const distances = {}
    const previous = {}
    const visited = new Set()

    nodes.forEach((node)=> {
        adjacency[node.id] = []
        distances[node.id] = Infinity
        previous[node.id] = null
    })

    edges.forEach((edge)=> {
        const weight = edge.weight ?? 1;

        adjacency[edge.source].push({
            node: edge.target,
            weight
        })

        if (!isDirected){
            adjacency[edge.target].push({
                node: edge.source,
                weight
            })
        }
    });

    const pq = new MinPriorityQueue()

    distances[startNodeId] = 0
    pq.insert(startNodeId, 0)

    while (!pq.isEmpty()){
        const {value: current} = pq.extractMin()
        if (visited.has(current)) continue;

        visited.add(current)

        steps.push({
            type: "visit",
            nodeId: current
        })

        adjacency[current].forEach(({node: neighbor, weight})=> {
            const newDistance = distances[current] + weight

            if (newDistance < distances[neighbor]){
                distances[neighbor] = newDistance
                previous[neighbor] = current

                pq.insert(neighbor, newDistance)

                steps.push({
                    type: "relax",
                    from: current,
                    to: neighbor,
                    newDistance
                })
            }
        })
    }
    const endTime = performance.now()
    const timeTaken = endTime - startTime
    return {
        steps,
        distances,
        previous,
        visitedCount: visited.size,
        timeTaken
    }
}