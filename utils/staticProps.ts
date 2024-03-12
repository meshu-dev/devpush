import { getPostPaginate, getPostBySlug } from '@/app/services/posts'
import { Post, PostPaginate } from '@/app/types'

export const getGuideViewProps = async (slug: string): Promise<PostPaginate | Post> => {
  if (isNaN(Number(slug))) {
    const post: Post = await getPostBySlug(slug ? slug.toString() : '')
    return post
  } else {
    const postPaginate: PostPaginate = await getPostPaginate(Number(slug))
    return postPaginate
  }
}
