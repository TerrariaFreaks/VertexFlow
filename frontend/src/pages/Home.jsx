import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import GraphCanvas from '../features/graphBuilder/GraphCanvas'
import useGraph from '../hooks/useGraph'
import useAlgorithm from '../hooks/useAlgorithm'
import { bfs } from '../algorithms/bfs'
import { dfs } from '../algorithms/dfs'
import { dijkstra } from '../algorithms/dijkstra'
import { useState, useEffect } from 'react'
import { kruskal } from '../algorithms/kruskal'
import { useParams } from 'react-router-dom'
import API from '../api/api.js'

function Home() {
  const graph = useGraph()
  const algorithm = useAlgorithm()
  const {id}= useParams()

  useEffect(() => {
    if (!id) return;

    const fetchGraphById = async() => {
      try {
         const res = await API.get(`/graphs/getGraphById/${id}`)

         const savedGraph = res.data.graph

         graph.setNodes(savedGraph.nodes)
         graph.setEdges(savedGraph.edges)
         graph.setIsDirected(savedGraph.isDirected)
         graph.setIsWeighted(savedGraph.isWeighted)

      } catch(error){
        console.log("Failed to fetch graph by id")
      }
    }
    
    fetchGraphById();

  }, [id])

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("BFS")

  const handleRunAlgorithm = () => {
    if (graph.nodes.length == 0){
      alert("Graph is empty")
      return;
    }
      if (selectedAlgorithm === "KRUSKAL") {
      const result = kruskal(graph.nodes, graph.edges, graph.isDirected);
      algorithm.start(result.steps, { mst: result.mstEdges, metrics: {
        visitedCount: result.visitedCount,
        timeTaken: result.timeTaken
      } });
      algorithm.setFinalDistance(result.totalCost);
      return;
    }

      if (selectedAlgorithm === "DIJKSTRA") {
      alert("Select source node");
      algorithm.setSelectionMode("source");
    } else {
      alert(`Select start node for ${selectedAlgorithm}`);
      algorithm.setSelectionMode("source");
    }
  }

  return (
    <div className='flex flex-col h-screen'>
    <Navbar graph={graph}
    onRun = {handleRunAlgorithm}
    algorithm = {algorithm}
    />

        <div className='flex flex-1'>
            <Sidebar graph={graph}
            algorithm={algorithm}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            />
            <GraphCanvas graph={graph}
            algorithm = {algorithm}
            selectedAlgorithm={selectedAlgorithm}
            />
        </div>
    </div>
  )
}

export default Home