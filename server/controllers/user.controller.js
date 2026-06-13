import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Historique des tutoriels suivis
export const getHistory = async (req, res, next) => {
  try {
    const userId = req.user.id

    const history = await prisma.progress.findMany({
      where: { userId },
      include: {
        tutorial: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            category: true,
            duration: true
          }
        }
      },
      orderBy: { watchedAt: 'desc' }
    })

    res.status(200).json({ success: true, history })
  } catch (err) {
    next(err)
  }
}

// Désinscription (soft delete RGPD)
export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id

    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() }
    })

    res.status(200).json({
      success: true,
      message: 'Compte supprimé avec succès'
    })
  } catch (err) {
    next(err)
  }
}