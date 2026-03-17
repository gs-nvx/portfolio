import api from './authApi'

export const getCmsSections = (locale = 'it') =>
  api.get('/admin/cms/sections', { params: { locale } })

export const updateCmsSection = (id, data) =>
  api.put(`/admin/cms/sections/${id}`, data)

export const toggleCmsSection = (id) =>
  api.patch(`/admin/cms/sections/${id}/toggle`)

export const updateSectionsOrder = (orders) =>
  api.put('/admin/cms/sections/order', orders)