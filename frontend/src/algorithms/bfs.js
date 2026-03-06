export function bfs(nodes, edges, startNodeId, isDirected){
    const startTime = performance.now()
    const visited = new Set();
    const queue = [];
    const steps = [];

    const adjacency = {};

    nodes.forEach((node) => {
        adjacency[node.id] = []
    });

    edges.forEach((edge) => {
        adjacency[edge.source].push(edge.target)

        if (!isDirected){
            adjacency[edge.target].push(edge.source)
        }
    });

    queue.push(startNodeId)
    visited.add(startNodeId)

    while (queue.length > 0){
        const current = queue.shift()

        steps.push({
            type: 'visit',
            nodeId: current
        });

        adjacency[current].forEach((neighbour) => {
            if (!visited.has(neighbour)){
                visited.add(neighbour)
                queue.push(neighbour)
            }
        });
    }
    const endTime = performance.now()
    const timeTaken = endTime - startTime
    return {steps, visitedCount: visited.size, timeTaken};
}