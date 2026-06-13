import { Router } from 'express'
import { getTutorials, getTutorialById, markProgress } from '../controllers/tutorial.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', getTutorials)
router.get('/:id', getTutorialById)
router.post('/:id/progress', authMiddleware, markProgress)

export default router