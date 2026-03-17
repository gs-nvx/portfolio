import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const getCmsSections = (locale = 'it') =>
  api.get('/cms/sections', { params: { locale } })

export const sendContactForm = (data) =>
  api.post('/contact', data)