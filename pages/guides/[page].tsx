import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import PostBlockList from '@/app/components/Post/PostBlockList'
import { Post, PostListProps, PostPaginate, PostViewProps } from '@/app/types'
import Layout from '@/app/components/Layout/Layout'
import { applyCopyCodeClickEvents, getTotalPages } from "@/utils/post"
import { ParsedUrlQuery } from 'querystring'
import { getPostListPaths, getPostViewPaths } from '@/utils/staticPaths'
import PostView from '@/app/components/Post/PostView'
import { useEffect } from 'react'
import { getGuideViewProps } from '@/utils/staticProps'
import { getPostPaginate } from '@/app/services/posts'

type Props = {
  postPaginate: PostPaginate
}

export const getStaticProps = (async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  let page: number = Number(context.params?.page ?? 0)
  const postPaginate: PostPaginate = await getPostPaginate(page) 
  
  return { props: { postPaginate } }

}) satisfies GetStaticProps<Props>

export const getStaticPaths = (async () => {
  const paths: PostListProps[] = await getPostListPaths()

  return {
    paths,
    fallback: false
  }
}) satisfies GetStaticPaths

const GuideView = ({ postPaginate }: Props) => {
  useEffect(() => {
    applyCopyCodeClickEvents()
  })

  return (
    <>
      <Layout>
        <PostBlockList
          posts={ postPaginate.data as Post[] }
          totalPages={ getTotalPages(postPaginate) } />
      </Layout>
    </>
  )
}

export default GuideView

