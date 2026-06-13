import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Liste tous les tutoriels (publiés et non publiés)
export const getAllTutorials = async (req, res, next) => {
  try {
    const tutorials = await prisma.tutorial.findMany({
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({ success: true, tutorials })
  } catch (err) {
    next(err)
  }
}

// Créer un tutoriel
export const createTutorial = async (req, res, next) => {
  try {
    const { title, description, videoUrl, thumbnail, category, duration } = req.body

    if (!title || !description || !videoUrl || !category) {
      return res.status(400).json({
        success: false,
        message: 'Titre, description, URL vidéo et catégorie requis'
      })
    }

    const tutorial = await prisma.tutorial.create({
      data: { title, description, videoUrl, thumbnail, category, duration }
    })

    res.status(201).json({ success: true, tutorial })
  } catch (err) {
    next(err)
  }
}

// Modifier un tutoriel
export const updateTutorial = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description, videoUrl, thumbnail, category, duration, published } = req.body

    const tutorial = await prisma.tutorial.update({
      where: { id },
      data: { title, description, videoUrl, thumbnail, category, duration, published }
    })

    res.status(200).json({ success: true, tutorial })
  } catch (err) {
    next(err)
  }
}

// Supprimer un tutoriel
export const deleteTutorial = async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.tutorial.delete({ where: { id } })

    res.status(200).json({
      success: true,
      message: 'Tutoriel supprimé avec succès'
    })
  } catch (err) {
    next(err)
  }
}

// Liste tous les utilisateurs
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    res.status(200).json({ success: true, users })
  } catch (err) {
    next(err)
  }
}