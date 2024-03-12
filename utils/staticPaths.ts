import { getPostUris, getPostPaginate } from '@/app/services/posts';
import { PostPaginate, PostUrl } from '@/app/types';
import { getTotalPages } from "@/utils/post"

export const getPostListPaths = async (): Promise<{ params: { page: string } }[]> => {
  const postPaginate: PostPaginate = await getPostPaginate()
  const totalPages: number = getTotalPages(postPaginate)

  let paths = []
 
  for (let counter: number = 0; counter < totalPages; counter++) {
    const nextPage: number = counter + 1

    if (nextPage > 1) {
      paths.push({ params: { page: nextPage.toString() } })
    }
  }
  return paths
}

export const getPostViewUrls = async (): Promise<string[]> => {
  const postUris: PostUri[] = await getPostUris();
  let urls: string[] = [];

  for (const postUri of postUris) {
    const uri: string = postUri.node.uri.slice(1, -1);
    urls.push(uri);
  }
  return urls;
}

export const getPostViewPaths = async () => {
  const postListUrls: string[] = [];//await getPostListUrls()
  const postViewUrls: string[] = await getPostViewUrls()
  const postUrls: string[]     = postListUrls.concat(postViewUrls)

  let paths = [];

  for (const postUrl of postUrls) {
    paths.push({ params: { slug: postUrl } })
  }
  return paths
}
