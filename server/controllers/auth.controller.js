import { PrismaClient } from '@prisma/client'
import { hashPassword, comparePassword } from '../utils/password.utils.js'
import { generateToken } from '../utils/jwt.utils.js'

const prisma = new PrismaClient()

export const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body

    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email, username et mot de passe requis'
      })
    }

    // Vérifier si l'email ou le username existe déjà
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    })

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Email ou username déjà utilisé'
      })
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword },
      select: { id: true, email: true, username: true, role: true, createdAt: true }
    })

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      token,
      user
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Message générique pour ne pas révéler si l'email existe (sécurité)
    if (!user || user.deletedAt) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides'
      })
    }

    const isValid = await comparePassword(password, user.password)

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides'
      })
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    })
  } catch (err) {
    next(err)
  }
}

export const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, username: true, role: true, createdAt: true }
    })

    res.status(200).json({ success: true, user })
  } catch (err) {
    next(err)
  }
}