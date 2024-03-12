import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import { getPostPaginate } from '@/app/services/posts'
import PostBlockList from '@/app/components/Post/PostBlockList'
import { PostPaginate } from '@/app/types'
import Layout from '@/app/components/Layout/Layout'
import { getTotalPages } from "@/utils/post"
import { ParsedUrlQuery } from 'querystring'
import { getPostListPaths } from '@/utils/staticPaths';

type Props = {
  postPaginate: PostPaginate
}

export const getStaticProps = (async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  const page: number = Number(context.params?.page)
  const postPaginate: PostPaginate = await getPostPaginate(page)
  
  return { props: { postPaginate } }
}) satisfies GetStaticProps<Props>

export const getStaticPaths = (async () => {
  const paths: { params: { page: string } }[] = await getPostListPaths()

  return {
    paths: paths,
    fallback: false
  }
}) satisfies GetStaticPaths

const Index = ({ postPaginate }: Props) => {
  return (
    <>
      <Layout>
        <PostBlockList
          posts={ postPaginate.data }
          totalPages={ getTotalPages(postPaginate) } />
      </Layout>
    </>
  )
}

export default Index;
