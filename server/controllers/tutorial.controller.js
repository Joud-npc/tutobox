import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Public — liste des tutoriels publiés
export const getTutorials = async (req, res, next) => {
  try {
    const { category } = req.query

    const tutorials = await prisma.tutorial.findMany({
      where: {
        published: true,
        ...(category && { category })
      },
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({ success: true, tutorials })
  } catch (err) {
    next(err)
  }
}

// Public — un seul tutoriel
export const getTutorialById = async (req, res, next) => {
  try {
    const { id } = req.params

    const tutorial = await prisma.tutorial.findUnique({
      where: { id, published: true }
    })

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutoriel introuvable'
      })
    }

    res.status(200).json({ success: true, tutorial })
  } catch (err) {
    next(err)
  }
}

// Connecté — marquer un tutoriel comme vu/complété
export const markProgress = async (req, res, next) => {
  try {
    const { id } = req.params
    const { completed } = req.body
    const userId = req.user.id

    const progress = await prisma.progress.upsert({
      where: {
        userId_tutorialId: { userId, tutorialId: id }
      },
      update: { completed, watchedAt: new Date() },
      create: { userId, tutorialId: id, completed: completed ?? false }
    })

    res.status(200).json({ success: true, progress })
  } catch (err) {
    next(err)
  }
}