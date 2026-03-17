import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getBlogPosts, getBlogPost,
  createBlogPost, updateBlogPost, deleteBlogPost
} from '../api/blogApi'

export function useBlogPosts(locale = 'it', page = 0) {
  return useQuery({
    queryKey: ['blog-posts', locale, page],
    queryFn: () => getBlogPosts(locale, page).then(r => r.data),
  })
}

export function useBlogPost(id) {
  return useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => getBlogPost(id).then(r => r.data),
    enabled: !!id,
  })
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blog-posts'] }),
  })
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => updateBlogPost(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blog-posts'] }),
  })
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blog-posts'] }),
  })
}