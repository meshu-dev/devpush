import { gql } from "@apollo/client";
import { client } from '@/utils/apollo';
import { Post, PostUri } from "@/app/types";

const setupFeaturedImage = (postData: any) => {
  let post = { ...postData, selected: false }

  if (postData.featuredImage?.node) {
    post.thumb = postData.featuredImage?.node ?? null;
    delete post.featuredImage;
  }

  return post;
};

export const getPostUrisOld = async (count: number = 100): Promise<PostUri[]> => {
  const getPostsQuery = gql`
    query PostKeysQuery($first: Int) {
      posts(first: $first) {
        nodes {
          id
          date
          uri
        }
      }
    }
  `;

  const response = await client.query({
    query: getPostsQuery,
    variables: { first: count }
  });

  return response?.data?.posts?.nodes;
}

export const getPostUris = async (count: number = 100): Promise<PostUri[]> => {
  const getPostsQuery = gql`
    query PostKeysQuery($first: Int) {
      posts(first: $first) {
        edges {
          cursor
          node {
            id
            date
            uri
          } 
        }
      }
    }
  `;

  const response = await client.query({
    query: getPostsQuery,
    variables: { first: count }
  });

  return response?.data?.posts?.edges;
}

export const getPaginatedPosts = async (afterId: string | null = null): Promise<Post[]> => {
  const pageLimit: number = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT);

  const getPostsQuery = gql`
    query PaginatedPostsQuery($first: Int, $after: String) {
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        nodes {
          id
          databaseId
          title
          excerpt
          date
          uri
          featuredImage {
            node {
              id
              sourceUrl
            }
          }
        }
      }
    }
  `;

  const response = await client.query({
    query: getPostsQuery,
    variables: { first: pageLimit, after: afterId }
  });

  let posts = response?.data?.posts?.nodes;

  //console.log('getPosts', posts);

  posts = posts.map((post: any) => setupFeaturedImage(post));
  return posts;
}

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const getSinglePostQuery = gql`
    query SinglePostBySlugQuery {
      post(id: "${slug}", idType: SLUG) {
        id
        title
        content
        date
        uri
        featuredImage {
          node {
            id
            sourceUrl
          }
        }
      }
    }
  `;

  const response = await client.query({ query: getSinglePostQuery });

  let post = response?.data?.post;

  //console.log('post', slug, response);

  return setupFeaturedImage(post);
}

export const findAfterIdForPage = async (page: number): Promise<string> => {
  const postUris: PostUri[] = await getPostUris();
  const pageLimit: number = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT);
  const postUriIndex: number = (pageLimit * (page - 1)) - 1;

  console.log('postUriIndex', postUriIndex);

  return postUris[postUriIndex].cursor;
}

export const getTotalsPosts = async () : Promise<number> => {
  const postKeys: PostUri[] = await getPostUris();

  const divsion: number = (postKeys.length / Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  const totalPages: number = Math.ceil(divsion);

  return totalPages;
}
