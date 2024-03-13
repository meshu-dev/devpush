import type { PostPaginate, Post, PostUrl } from "@/app/types"

const apiUrl: string = process.env.NEXT_PUBLIC_DEVPUSH_API_URL ?? ''

const getResponse = async (url: string) => {
  const response = await fetch(url)
  return await response.json()
}

const getData = async (url: string) => {
  const result = await getResponse(url)
  return result['data']
}

export const getPostPaginate = (page: number = 1): Promise<PostPaginate> => {
  return getResponse(`${apiUrl}/posts?page=${page}`)
}

export const getPostUrls = (): Promise<PostUrl[]> => {
  return getData(`${apiUrl}/posts/urls`)
}

export const getPostBySlug = (slug: string): Promise<Post> => {
  return getData(`${apiUrl}/posts/slug/${slug}`)
}
