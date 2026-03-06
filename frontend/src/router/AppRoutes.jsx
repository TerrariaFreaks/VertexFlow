import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from '../components/Protectedroute'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import MyGraphs from '../pages/MyGraphs'

export default function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='/myGraphs' element={<ProtectedRoute><MyGraphs /></ProtectedRoute>} />
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/home/:id' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/register' element={<Register />} />
            <Route path='/notFound' element={<NotFound />} />
        </Routes>

    )
}