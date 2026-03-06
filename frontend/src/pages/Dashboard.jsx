import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../api/api.js'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
      localStorage.removeItem('token')
      navigate('/')
    }

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Top Navbar */}
      <div className="bg-black shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className=" text-white text-xl font-semibold">Dashboard</h1>

        <div className="flex gap-4">
          <button
            onClick={() => {
              navigate('/myGraphs')
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            My Graphs
          </button>
          

          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
          >
            + Create New Graph
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-6 mt-6">

    
</div>

    </div>    
  )
}

export default Dashboard