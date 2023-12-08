import { getPostUris, getTotalsPosts } from '@/app/services/posts';
import { PostUri } from '@/app/types';

export const getPostListUrls = async (): Promise<string[]> => {
  const totalPages: number = await getTotalsPosts();
  let urls: string[] = [];
 
  for (let counter: number = 0; counter < totalPages; counter++) {
    const nextPage: number = counter + 1;

    if (nextPage > 1) {
      urls.push(nextPage.toString());
    }
  }
  return urls;
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
  const postListUrls: string[] = await getPostListUrls();
  const postViewUrls: string[] = await getPostViewUrls();
  const postUrls: string[]     = postListUrls.concat(postViewUrls);

  let paths = [];

  for (const postUrl of postUrls) {
    paths.push({ params: { slug: postUrl } });
  }
  return paths;
}
