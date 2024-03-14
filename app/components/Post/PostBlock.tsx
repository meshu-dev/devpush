import React from "react";
import Link from 'next/link'
import { Post } from '@/app/types'
import { getPostDate } from "@/utils/post"

type Props = {
  post: Post
}

const PostBlock = ({ post }: Props) => {
  return (
    <div className="post-block">
      <div className="post-block-content">
        <div className="post-block-title">
          <Link href={ `/${post.slug}` }>{ post.title }</Link>
        </div>
        <div className="post-block-excerpt">{ getPostDate(post.published_at) }</div>
      </div>
    </div>
  );
}

export default PostBlock
