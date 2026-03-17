import api from './authApi'

export const uploadMedia = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/admin/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const deleteMedia = (filename) =>
  api.delete(`/admin/media/${filename}`)