import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { createGraph, updateGraph, getGraphById, getUserGraphs, deleteGraph, getPublicGraphs } from '../controllers/graphController.js'

const router = express.Router()

router.post('/create', protect, createGraph)
router.get('/getUserGraphs', protect, getUserGraphs)
router.get('/getGraphById/:id', protect, getGraphById)
router.put('/update/:id', protect, updateGraph)
router.delete('/delete/:id', protect, deleteGraph)
router.get('/getPublicGraphs', getPublicGraphs)

export default router