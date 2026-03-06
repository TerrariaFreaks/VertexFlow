import { useParams } from 'react-router-dom';
import API from '../api/api.js'
function Navbar({graph, onRun, algorithm}) {
  const {resetGraph, setSelectedNode} = graph;
  const {reset}  = algorithm
  const {id} = useParams()
  const handleReset = () => {
    reset()
    resetGraph()
    setSelectedNode(null)
  }
  const saveGraph = async () => {
    const title = prompt("Enter graph title: ")
    if (!title) return;

    const isPublic = window.confirm("Make this graph public?")

    try {
      const {nodes, edges, isDirected, isWeighted} = graph

      const graphData = {
        title, nodes, edges, isDirected, isWeighted, isPublic
      }
      if (id) {
      await API.put(`/graphs/update/${id}`, graphData)
      alert("Graph updated successfully")
      return;
      }
      
      await API.post('/graphs/create', graphData)
      alert("Graph saved successfully")
      
    } catch(error){
      alert("Failed to save graph")
    }
  }
  return (
    <nav className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md">
      <h1 className="text-xl font-semibold tracking-wide">
        VertexFlow
      </h1>

      <div className="flex gap-4">
        <button
        onClick={handleReset} 
        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition">
          Reset
        </button>

        <button 
        onClick={onRun}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
          Run Algorithm
        </button>

        <button
        onClick={saveGraph} 
        className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-700 transition">
          Save
        </button>
        
      </div>
    </nav>
  );
}

export default Navbar;
