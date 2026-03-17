import axios from 'axios'
const api = axios.create({ baseURL: '/api' })

export const getConfiguratorPackages = () => api.get('/configurator/packages')
export const getConfiguratorServices = () => api.get('/configurator/services')