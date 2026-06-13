import api from './api.js'

export const getTutorials = async (category) => {
  const res = await api.get('/tutorials', {
    params: category ? { category } : {}
  })
  return res.data
}

export const getTutorialById = async (id) => {
  const res = await api.get(`/tutorials/${id}`)
  return res.data
}

export const markProgress = async (id, completed) => {
  const res = await api.post(`/tutorials/${id}/progress`, { completed })
  return res.data
} 

export const getHistory = async () => {
  const res = await api.get('/users/history')
  return res.data.history  // ← ajoute .history
}