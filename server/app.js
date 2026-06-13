import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import tutorialRoutes from './routes/tutorial.routes.js'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/tutorials', tutorialRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

// Gestion des erreurs (doit être en dernier)
app.use(errorMiddleware)

export default app