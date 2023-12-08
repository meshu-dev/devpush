import type { GetStaticProps } from 'next';
import { getPaginatedPosts, getTotalsPosts } from '@/app/services/posts';
import PostBlockList from '@/app/components/Post/PostBlockList';
import { Post } from '@/app/types';
import Layout from '@/app/components/Layout/Layout';

type Props = {
  posts: Post[],
  totalPages: number
}

export const getStaticProps = (async () => {
  const posts: Post[] = await getPaginatedPosts();
  const totalPages: number = await getTotalsPosts();
  return { props: { posts, totalPages } };
}) satisfies GetStaticProps<Props>

const Index = ({ posts, totalPages }: Props) => {
  return (
    <>
      <Layout>
        <div id="intro-msg">Tutorials to support PHP &amp; JavaScript development</div>
        <PostBlockList posts={ posts } totalPages={ totalPages } />
      </Layout>
    </>
  )
}

export default Index;
