import type { PostPaginate, Post } from "@/app/types"

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

export const getPostUrls = (): Promise<Post[]> => {
  return getData(`${apiUrl}/posts/urls`)
}

export const getPost = (id: number): Promise<Post> => {
  return getData(`${apiUrl}/posts/${id}`)
}
