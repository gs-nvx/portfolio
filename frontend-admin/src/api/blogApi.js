import api from './authApi'

export const getBlogPosts = (locale = 'it', page = 0, size = 10) =>
  api.get('/admin/blog', { params: { locale, page, size } })

export const getBlogPost = (id) =>
  api.get(`/admin/blog/${id}`)

export const createBlogPost = (data) =>
  api.post('/admin/blog', data)

export const updateBlogPost = (id, data) =>
  api.put(`/admin/blog/${id}`, data)

export const deleteBlogPost = (id) =>
  api.delete(`/admin/blog/${id}`)