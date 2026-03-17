import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/authApi'

export function useAuth() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (username, password) => {
    setLoading(true)
    setError(null)
    try {
      const res = await login(username, password)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch {
      setError('Credenziali non valide')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const isAuthenticated = () => !!localStorage.getItem('token')

  return { handleLogin, handleLogout, isAuthenticated, error, loading }
}