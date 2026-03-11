import React from 'react'
import { useEffect, useState } from 'react'
import API from '../api/api.js'
import { useNavigate } from 'react-router-dom'

function MyGraphs() {
    const [graphs, setGraphs] = useState([])
    const navigate = useNavigate()

    const fetchGraphs = async () => {
      try {
        const res = await API.get('/graphs/getUserGraphs')

        setGraphs(res.data.graph)

    } catch (error){
      console.log("Failed to fetch graphs")
        }
    }

    useEffect(() => {
        fetchGraphs()
    }, [])

    const openGraph = (id) => {
    navigate(`/home/${id}`)
    }

    const deleteGraph = async (id) => {
      if (!window.confirm("Delete this graph?")) return;
      try {
        await API.delete(`/graphs/delete/${id}`);
        setGraphs((prev) => prev.filter((graph) => graph._id !== id))
      } catch (error){
        console.error("Failed to delete graph", error);
      }
    }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-semibold mb-6">
        My Graphs
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {graphs.map((graph) => (

          <div
            key={graph._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
          >

            <h3 className="text-lg font-semibold">
              {graph.title}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Created: {new Date(graph.createdAt).toLocaleDateString()}
            </p>

            <button
              onClick={() => openGraph(graph._id)}
              className="mt-4 text-blue-600 hover:underline"
            >
              Open
            </button>

              <button
                onClick={() => deleteGraph(graph._id)}
                className="text-red-600 hover:underline pl-65"
              >
                Delete
              </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default MyGraphs