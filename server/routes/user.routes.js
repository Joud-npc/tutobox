import { Router } from 'express'
import { getHistory, deleteAccount } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/history', authMiddleware, getHistory)
router.delete('/account', authMiddleware, deleteAccount)

export default router