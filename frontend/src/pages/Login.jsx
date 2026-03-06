import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import API from '../api/api'

function Login() {
    const navigate = useNavigate()
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
      try {
        const res = await API.post(
          '/auth/login', {
            identifier,
            password
          }
        )
        const token = res.data.token
        localStorage.setItem("token", token)

        alert("Login Successful")
        navigate('/dashboard')

      } catch (error){
        alert(error?.response?.data?.message || "Login failed")
      }
         
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        {/* Username or Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Username or Email
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter username or email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login