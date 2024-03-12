import type { GetStaticProps } from 'next'
import { getPostPaginate } from '@/app/services/posts'
import PostBlockList from '@/app/components/Post/PostBlockList'
import { PostPaginate } from '@/app/types'
import Layout from '@/app/components/Layout/Layout'
import { getTotalPages } from "@/utils/post"

type Props = {
  postPaginate: PostPaginate
}

export const getStaticProps = (async () => {
  const postPaginate: PostPaginate = await getPostPaginate()
  
  return { props: { postPaginate } }
}) satisfies GetStaticProps<Props>

const Index = ({ postPaginate }: Props) => {
  return (
    <>
      <Layout>
        <div id="intro-msg">Guides to support PHP &amp; JavaScript development</div>
        <PostBlockList
          posts={ postPaginate.data }
          totalPages={ getTotalPages(postPaginate) } />
      </Layout>
    </>
  )
}

export default Index
