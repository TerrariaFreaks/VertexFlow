import { useState } from "react";

function useGraph(){
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [isDirected, setIsDirected] = useState(false)
    const [isWeighted, setIsWeighted] = useState(false)
    const [selectedNode, setSelectedNode] = useState(null)
    const [draggingNode, setDraggingNode] = useState(null)
 

    // function to add a new node
    const addNode = (x, y) => {
        const newNode = {
            id: Date.now(),
            x,
            y
        };
        setNodes((prev) => [...prev, newNode])
    };

    // function to remove a node
    const removeNode = (nodeId) => {
        setNodes((prev) => prev.filter((node) => node.id != nodeId))

        // remove the connected edges as well
        setEdges((prev) => prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
    };

    // add an edge
    const addEdge = (sourceId, targetId) => {
        if (sourceId === targetId) return;

        let weight = 1;

        if (isWeighted) {
            const input = prompt("Enter edge weight:");

            if (input === null) return;

            const parsed = Number(input);

            if (isNaN(parsed)) {
            alert("Invalid input. Using default weight = 1");
            weight = 1;
            } else {
            weight = parsed;
            }
        }

setEdges((prevEdges) => {
    const edgeExists = prevEdges.some(
      (edge) =>
        edge.source === sourceId &&
        edge.target === targetId
    );

    if (!isDirected) {
      const reverseExists = prevEdges.some(
        (edge) =>
          edge.source === targetId &&
          edge.target === sourceId
      );

      if (reverseExists) return prevEdges;
    }

    if (edgeExists) return prevEdges;

    const newEdge = {
      id: Date.now(),
      source: sourceId,
      target: targetId,
      weight
    };

    return [...prevEdges, newEdge];
  });
};
    
    // remove an edge
    const removeEdge = (edgeId) => {
        setEdges((prev) => prev.filter((edge) => edge.id != edgeId))
    }

    const resetGraph = ()=>{
        setNodes([])
        setEdges([])
        setSelectedNode(null)
    };

    // update edge weight
    const updateEdgeWeight = (edgeId) => {
        const input = prompt("Enter new edge weight:");

        if (input === null) return;

        const parsed = Number(input);

        if (isNaN(parsed)) {
            alert("Invalid weight. Keeping previous value.");
            return;
        }

        setEdges((prevEdges) =>
            prevEdges.map((edge) =>
            edge.id === edgeId
                ? { ...edge, weight: parsed }
                : edge
            )
        );
};

    return {
        nodes,
        edges,
        setNodes,
        setEdges,
        selectedNode,
        setSelectedNode,
        addEdge,
        addNode,
        removeEdge,
        removeNode,
        resetGraph,
        isDirected,
        setIsDirected,
        isWeighted,
        setIsWeighted,
        draggingNode,
        setDraggingNode,
        updateEdgeWeight
    };
}

export default useGraph;