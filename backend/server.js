import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import protect from './src/middleware/authMiddleware.js'
import graphRoutes from './src/routes/graphRoutes.js'

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/graphs', graphRoutes)

app.get('/', (req, res)=> {
    res.send("Backend API is running ...")
});

app.get("/api/test-protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
});