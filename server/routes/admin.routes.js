import { Router } from 'express'
import {
  getAllTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getAllUsers
} from '../controllers/admin.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { requireRole } from '../middlewares/role.middleware.js'

const router = Router()

router.use(authMiddleware, requireRole('ADMIN'))

router.get('/tutorials', getAllTutorials)
router.post('/tutorials', createTutorial)
router.put('/tutorials/:id', updateTutorial)
router.delete('/tutorials/:id', deleteTutorial)
router.get('/users', getAllUsers)

export default router