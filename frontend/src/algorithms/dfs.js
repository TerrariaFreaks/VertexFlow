export function dfs(nodes, edges, startNodeId, isDirected){
    const startTime = performance.now()
    const visited = new Set()
    const stack = []
    const steps = []

    const adjacency = {}

    nodes.forEach((node)=> {
        adjacency[node.id] = []
    });

    edges.forEach((edge)=> {
        adjacency[edge.source].push(edge.target)

        if (!isDirected){
            adjacency[edge.target].push(edge.source)
        }
    });

    stack.push(startNodeId)

    while (stack.length > 0){
        const current = stack.pop()

        if (visited.has(current)) continue;

        visited.add(current)

        steps.push({
            type: "visit",
            nodeId: current
        });
        const neighbours = adjacency[current]
        for(let i=neighbours.length-1; i>=0; i--){
            const neighbour = neighbours[i];
            if (!visited.has(neighbour)){
                stack.push(neighbour)
            }
        }
    }
    const endTime = performance.now()
    const timeTaken = endTime - startTime
    
    return {steps, visitedCount: visited.size, timeTaken};
}