import { Post } from '@/app/types';
import Layout from '@/app/components/Layout/Layout';
import PostView from '@/app/components/Post/PostView';
import PostBlockList from '@/app/components/Post/PostBlockList';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from 'next';
import { getPaginatedPosts, getPostBySlug, findAfterIdForPage } from '@/app/services/posts';
import { ParsedUrlQuery } from 'querystring';
import { getPostViewPaths } from '@/utils/staticPaths';

type Props = {
  postData: Post | Post[]
}

export const getStaticProps = (async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  const slug: string | undefined = context.params?.slug?.toString();

  console.log('getStaticProps - slug', slug);

  if (slug) {
    if (isNaN(Number(slug))) {
      const post: Post = await getPostBySlug(slug);
      return { props: { postData: post } };
    } else {
      const page: number = Number(slug);
      const afterPostId: string = await findAfterIdForPage(page);

      console.log('afterPostId', afterPostId);

      const posts: Post[] = await getPaginatedPosts(afterPostId);
      return { props: { postData: posts } };
    }
  }
  const posts: Post[] = await getPaginatedPosts();
  return { props: { postData: posts } };
}) satisfies GetStaticProps<Props>

export const getStaticPaths = (async () => {
  const paths: { params: { slug: string } }[] = await getPostViewPaths();

  console.log('paths', paths);

  return {
    paths: paths,
    fallback: false
  }
}) satisfies GetStaticPaths

export default ({ postData }: Props) => {
  let postView: React.JSX.Element;

  if ((postData as Post[])?.length) {
    postView = <PostBlockList posts={ postData as Post[] } totalPages={ 6 } />
  } else {
    postView = <PostView post={ postData as Post } />
  }

  return (
    <>
      <Layout>
        { postView }
      </Layout>
    </>
  )
}
