import { bfs } from "../../algorithms/bfs"
import { dfs } from "../../algorithms/dfs";
import { dijkstra } from "../../algorithms/dijkstra";
import { prim } from "../../algorithms/prim";
import { kruskal } from "../../algorithms/kruskal";
import { astar } from "../../algorithms/astar";

function GraphCanvas({graph, algorithm, selectedAlgorithm}) {
  const {
    nodes,
    edges,
    addNode,
    addEdge,
    selectedNode,
    setSelectedNode,
    isDirected,
    isWeighted,
    removeNode,
    draggingNode,
    setDraggingNode,
    setNodes,
    updateEdgeWeight,
  } = graph;

  const {
    selectionMode,
    setSelectionMode,
    sourceNode,
    setSourceNode,
    setDestinationNode,
    setFinalPath,
    setFinalDistance,
    start,
    visited,
    currentNode,
    activeEdge,
    finalPath,
    finalMst,
    finalDistance
  } = algorithm


  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    addNode(x, y)
  };

  const handleNodeClick = (nodeId, e) => {
      e.stopPropagation();
      
      if (selectionMode === "source") {
      setSourceNode(nodeId);

      if (selectedAlgorithm === "DIJKSTRA" || selectedAlgorithm === "ASTAR") {
        alert("Select destination node");
        setSelectionMode("destination");
    } else {
        if (selectedAlgorithm === "BFS") {
        const result = bfs(nodes, edges, nodeId, isDirected);
        start(result.steps, {
          metrics: {
            visitedCount: result.visitedCount,
            timeTaken: result.timeTaken
          }
        });
      }
      else if (selectedAlgorithm === "DFS") {
        const result = dfs(nodes, edges, nodeId, isDirected);
        start(result.steps, {
          metrics: {
            visitedCount: result.visitedCount,
            timeTaken: result.timeTaken
          }
        });
      }
      else if (selectedAlgorithm === "PRIM") {
        const result = prim(nodes, edges, nodeId, isDirected);
        start(result.steps, {mst: result.mstEdges, metrics: {
          visitedCount: result.visitedCount,
          timeTaken: result.timeTaken
        }});
        algorithm.setFinalDistance(result.totalCost)
      }
      setSelectionMode(null);
      return;
    }

  return;
}

if (selectionMode === "destination") {
  setDestinationNode(nodeId);

  let result;

  if (selectedAlgorithm === "DIJKSTRA"){
    result = dijkstra(nodes, edges, sourceNode, isDirected)
    start(result.steps, {
      result: {
        previous: result.previous,
        destination: nodeId
      },
      metrics: {
        visitedCount: result.visitedCount,
        timeTaken: result.timeTaken
      }
    })
  }
  else if (selectedAlgorithm === "ASTAR"){
    result = astar(nodes, edges, sourceNode, nodeId, isDirected)
    start(result.steps, {
      result: {
        previous: result.previous,
        destination: nodeId
      },
      metrics: {
        visitedCount: result.visitedCount,
        timeTaken: result.timeTaken
      }
    })
  }

  algorithm.setFinalDistance(result.distances[nodeId]);
  setSelectionMode(null);
  return;
}

  if (!selectedNode) {
    setSelectedNode(nodeId);
    return;
  } else {
    addEdge(selectedNode, nodeId);
    setSelectedNode(null);
  }
  };

  const handleMouseMove = (e) => {
    if (!draggingNode) return;
    const rect = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setNodes((prev)=> prev.map((node) => node.id === draggingNode ? {...node, x, y} : node))
  };

  const handleMouseUp = () => {
    setDraggingNode(null)
  };

  return (
    <div
    className="flex-1 relative border bg-white"
    onClick={handleCanvasClick}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}

  >
    {(selectedAlgorithm === "PRIM" || selectedAlgorithm === "KRUSKAL") && finalDistance !== null && (
      <div className="absolute top-4 left-4 bg-white p-2 shadow">
        Total MST Cost: {finalDistance}
      </div>
    )}
    {/* SINGLE SVG LAYER FOR ALL EDGES */}
    <svg className="absolute top-0 left-0 w-full h-full">
      {isDirected && (
    <defs>
      <marker
        id="arrow"
        markerWidth="10"
        markerHeight="10"
        refX="10"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="black" />
      </marker>
    </defs>
  )}
      {edges.map((edge) => {
        const source = nodes.find(n => n.id === edge.source);
        const target = nodes.find(n => n.id === edge.target);

        if (!source || !target) return null;

        const isMSTEdge =
          finalMst &&
          finalMst.some(
            (e) =>
              (e.from === edge.source && e.to === edge.target) ||
              (!isDirected &&
                e.from === edge.target &&
                e.to === edge.source)
          );

        const isFinalEdge =
          finalPath &&
          finalPath.length > 1 &&
          finalPath.some((node, index) => {
            if (index === finalPath.length - 1) return false;

            const nextNode = finalPath[index + 1];

            return (
              (edge.source === node && edge.target === nextNode) ||
              (!isDirected &&
                edge.source === nextNode &&
                edge.target === node)
            );
          });

       return (
            <g key={edge.id}>
            {/* Edge Line */}
            <line
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={
                  isMSTEdge
                    ? "red"
                    : isFinalEdge
                    ? "red"
                    : activeEdge &&
                      (
                        (activeEdge.from === edge.source && activeEdge.to === edge.target) ||
                        (!isDirected &&
                          activeEdge.from === edge.target &&
                          activeEdge.to === edge.source)
                      )
                    ? "orange"
                    : "black"
                }
              strokeWidth="2"
              markerEnd={isDirected ? "url(#arrow)" : undefined}
              onContextMenu={(e) => {
                e.preventDefault();
                updateEdgeWeight(edge.id);
              }}
              style={{ cursor: "pointer" }}
            />

            {/* Weight Label */}
            {isWeighted && (() => {
              const midX = (source.x + target.x) / 2;
              const midY = (source.y + target.y) / 2;

              const dx = target.x - source.x;
              const dy = target.y - source.y;

              const length = Math.sqrt(dx * dx + dy * dy);
              if (length === 0) return null;

              // Perpendicular unit vector
              const offsetX = -dy / length;
              const offsetY = dx / length;

              const distance = 15; // adjust spacing here

              const textX = midX + offsetX * distance;
              const textY = midY + offsetY * distance;

              return (
                <text
                  x={textX}
                  y={textY}
                  fill="red"
                  fontSize="14"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {edge.weight}
                </text>
              );
            })()}
          </g>
          );
      })}
    </svg>

    {/* NODES */}
    {nodes.map((node) => (
      <div
        key={node.id}
        onClick={(e) => handleNodeClick(node.id, e)}
        onMouseDown={(e) => {
          e.stopPropagation()
          setDraggingNode(node.id)
        }}
        onContextMenu={(e) => {
          e.preventDefault(); // prevent browser menu
          removeNode(node.id);
        }}
        style={{
          position: "absolute",
          left: node.x,
          top: node.y,
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor:
            currentNode === node.id ? "yellow" : visited.has(node.id) ? "green" : selectedNode === node.id ? "orange" : "blue",
          transform: "translate(-50%, -50%)",
          cursor: "pointer"
        }}
      />
    ))}
  </div>
  )
}

export default GraphCanvas;
