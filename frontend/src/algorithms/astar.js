import {MinPriorityQueue} from './priorityQueue'

export function astar(nodes, edges, startId, endId, isDirected){
    const startTime = performance.now()
    const steps = []
    const adjacency = {}
    const gScore = {}
    const fScore = {}
    const previous = {}
    const visited = new Set()

    nodes.forEach((node)=> {
        adjacency[node.id] = []
        gScore[node.id] = Infinity
        fScore[node.id] = Infinity
        previous[node.id] = null

    });

    edges.forEach((edge) => {
        const weight = edge.weight ?? 1
        adjacency[edge.source].push({
            node: edge.target,
            weight
        });
        if (!isDirected){
            adjacency[edge.target].push({
                node: edge.source,
                weight
            });
        }
    });

    const getNode = (id) => nodes.find(n => n.id === id)

    const heuristic = (a, b) => {
        const nodeA = getNode(a)
        const nodeB = getNode(b)

        const dx = nodeA.x - nodeB.x
        const dy = nodeA.y - nodeB.y

        return Math.sqrt(dx * dx + dy * dy);
    }

    const pq = new MinPriorityQueue()

    gScore[startId] = 0
    fScore[startId]= heuristic(startId, endId)

    pq.insert(startId, fScore[startId])

    while (!pq.isEmpty()){
        const {value: current} = pq.extractMin()

        if (visited.has(current)) continue;

        visited.add(current)

        steps.push({
            type: "visit",
            nodeId: current
        })

        if (current === endId) break;

        for (const {node: neighbour, weight} of adjacency[current]){
            const tentativeG = gScore[current] + weight

            steps.push({
                type: "relax",
                from: current,
                to: neighbour
            });

            if (tentativeG < gScore[neighbour]){
                previous[neighbour] = current
                gScore[neighbour] = tentativeG
                fScore[neighbour] = tentativeG + heuristic(neighbour, endId)

                pq.insert(neighbour, fScore[neighbour])
            }

        }
    }
    const endTime = performance.now()
    const timeTaken = endTime - startTime
    return {
        steps,
        previous,
        distances: gScore,
        visitedCount: visited.size,
        timeTaken
    };
}