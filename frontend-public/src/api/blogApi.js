import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const getBlogPosts = (locale = 'it', page = 0, size = 9) =>
  api.get('/blog', { params: { locale, page, size } })

export const getBlogPost = (slug, locale = 'it') =>
  api.get(`/blog/${slug}`, { params: { locale } })