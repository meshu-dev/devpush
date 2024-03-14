import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import PostBlockList from '@/app/components/Post/PostBlockList'
import { Post, PostPaginate, PostViewProps } from '@/app/types'
import Layout from '@/app/components/Layout/Layout'
import { applyCopyCodeClickEvents, getTotalPages } from "@/utils/post"
import { ParsedUrlQuery } from 'querystring'
import { getPostListPaths, getPostViewPaths } from '@/utils/staticPaths'
import PostView from '@/app/components/Post/PostView'
import { useEffect } from 'react'
import { getGuideViewProps } from '@/utils/staticProps'
import { getPostBySlug } from '@/app/services/posts'

type Props = {
  post: Post
}

export const getStaticProps = (async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  let slug: string = context.params?.slug?.toString() ?? ''
  const post: Post = await getPostBySlug(slug)
  
  return { props: { post } }

}) satisfies GetStaticProps<Props>

export const getStaticPaths = (async () => {
  const paths: PostViewProps[] = await getPostViewPaths()

  return {
    paths,
    fallback: false
  }
}) satisfies GetStaticPaths

const GuideView = ({ post }: Props) => {
  useEffect(() => {
    applyCopyCodeClickEvents()
  })

  return (
    <>
      <Layout>
        <PostView post={ post } />
      </Layout>
    </>
  )
}

export default GuideView

