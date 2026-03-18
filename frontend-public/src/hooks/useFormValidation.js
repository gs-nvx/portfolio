import { useState } from 'react'

export function useFormValidation(rules) {
  const [errors, setErrors] = useState({})

  const validate = (form) => {
    const newErrors = {}
    rules.forEach(({ field, required, type }) => {
      const value = form[field]?.trim?.() ?? String(form[field] ?? '')
      if (required && !value) {
        newErrors[field] = 'Compila questo campo'
      } else if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field] = 'Inserisci un indirizzo email valido'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const clearError = (field) => {
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  return { errors, validate, clearError }
}