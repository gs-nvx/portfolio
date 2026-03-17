import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCmsSections, updateCmsSection, toggleCmsSection } from '../api/cmsApi'

export function useCmsSections(locale = 'it') {
  return useQuery({
    queryKey: ['cms-sections', locale],
    queryFn: () => getCmsSections(locale).then(r => r.data),
  })
}

export function useUpdateCmsSection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => updateCmsSection(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cms-sections'] }),
  })
}

export function useToggleCmsSection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => toggleCmsSection(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cms-sections'] }),
  })
}