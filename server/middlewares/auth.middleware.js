import { verifyToken } from '../utils/jwt.utils.js'

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token manquant ou invalide'
      })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token expiré ou invalide'
    })
  }
}