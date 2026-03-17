import { useState, useEffect } from 'react'
import { getCmsSections } from '../api/cmsApi'

export function useCmsSections(locale = 'it') {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCmsSections(locale)
      .then(r => {
        const data = r.data
        // gestisce sia array diretto che oggetto paginato
        if (Array.isArray(data)) {
          setSections(data)
        } else if (Array.isArray(data?.content)) {
          setSections(data.content)
        } else {
          setSections([])
        }
      })
      .finally(() => setLoading(false))
  }, [locale])

  const getSection = (key) =>
    sections.find(s => s.sectionKey === key)

  const getContent = (key) => {
    const section = getSection(key)
    if (!section) return null
    try { return JSON.parse(section.contentJson) }
    catch { return null }
  }

  return { sections, loading, getSection, getContent }
}