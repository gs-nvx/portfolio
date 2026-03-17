import api from './authApi'

export const getPackages = () => api.get('/admin/configurator/packages')
export const createPackage = (data) => api.post('/admin/configurator/packages', data)
export const updatePackage = (id, data) => api.put(`/admin/configurator/packages/${id}`, data)
export const deletePackage = (id) => api.delete(`/admin/configurator/packages/${id}`)

export const getServices = () => api.get('/admin/configurator/services')
export const createService = (data) => api.post('/admin/configurator/services', data)
export const updateService = (id, data) => api.put(`/admin/configurator/services/${id}`, data)
export const deleteService = (id) => api.delete(`/admin/configurator/services/${id}`)