import api from './api.js'

export const getAllTutorials = async () => {
  const res = await api.get('/admin/tutorials')
  return res.data.tutorials
}

export const createTutorial = async (data) => {
  const res = await api.post('/admin/tutorials', data)
  return res.data
}

export const updateTutorial = async (id, data) => {
  const res = await api.put(`/admin/tutorials/${id}`, data)
  return res.data
}

export const deleteTutorial = async (id) => {
  const res = await api.delete(`/admin/tutorials/${id}`)
  return res.data
}