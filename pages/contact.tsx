import type { GetStaticProps } from 'next'
import { getPostPaginate } from '@/app/services/posts'
import PostBlockList from '@/app/components/Post/PostBlockList'
import { PostPaginate } from '@/app/types'
import Layout from '@/app/components/Layout/Layout'
import { getTotalPages } from "@/utils/post"
import Link from 'next/link'

type Props = {
  postPaginate: PostPaginate
}

export const getStaticProps = (async () => {
  const postPaginate: PostPaginate = await getPostPaginate()
  
  return { props: { postPaginate } }
}) satisfies GetStaticProps<Props>

const Contact = ({ postPaginate }: Props) => {
  return (
    <>
      <Layout>
        <h1>Contact</h1>
        <div id="contact">
          <p>You can contact me by e-mail with 
            any questions, comments, feedback or even help with any of 
            the guides on the website.</p>
          <div id="contact-email">
            <Link href="mailto: contact@devpush.io">
              contact@devpush.io
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Contact
