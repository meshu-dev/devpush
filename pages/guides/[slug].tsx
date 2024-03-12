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

type Props = {
  guideData: PostPaginate | Post
}

export const getStaticProps = (async (context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>) => {
  let slug: string = context.params?.slug?.toString() ?? ''
  const guideData = await getGuideViewProps(slug)
  
  return { props: { guideData } }

}) satisfies GetStaticProps<Props>

export const getStaticPaths = (async () => {
  const listPaths: PostViewProps[] = await getPostListPaths()
  const viewPaths: PostViewProps[] = await getPostViewPaths()
  const paths: PostViewProps[]     = listPaths.concat(viewPaths); 

  return {
    paths,
    fallback: false
  }
}) satisfies GetStaticPaths

const GuideView = ({ guideData }: Props) => {
  let postView: React.JSX.Element

  useEffect(() => {
    applyCopyCodeClickEvents()
  })

  if ((guideData as PostPaginate)?.data) {
    const postPaginate = guideData as PostPaginate

    postView =  <PostBlockList
                  posts={ postPaginate.data as Post[] }
                  totalPages={ getTotalPages(postPaginate) } />
  } else {
    postView =  <PostView post={ guideData as Post } />
  }

  return (
    <>
      <Layout>
        { postView }
      </Layout>
    </>
  )
}

export default GuideView

