import { getPostUrls, getPostPaginate } from '@/app/services/posts';
import { PostListProps, PostPaginate, PostUrl, PostViewProps } from '@/app/types';
import { getTotalPages } from "@/utils/post"

export const getPostListPaths = async (): Promise<PostListProps[]> => {
  const postPaginate: PostPaginate = await getPostPaginate()
  const totalPages: number         = getTotalPages(postPaginate)
  const paths: PostListProps[]     = []
 
  for (let counter: number = 0; counter < totalPages; counter++) {
    const nextPage: number = counter + 1

    if (nextPage > 1) {
      paths.push({ params: { page: nextPage.toString() } })
    }
  }
  return paths
}

export const getPostViewPaths = async (): Promise<PostViewProps[]> => {
  const postUrls: PostUrl[]    = await getPostUrls()
  const paths: PostViewProps[] = []

  for (const postUrl of postUrls) {
    paths.push({ params: { slug: postUrl.slug.toString() } })
  }
  return paths
}
