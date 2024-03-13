import React from "react";
import Link from 'next/link'
import { Image } from '@mantine/core';
import { Post } from '@/app/types';
import { getPostDate } from "@/utils/post";

type Props = {
  post: Post
}

const PostBlock = ({ post }: Props) => {
  let imgElement =  <Image
                      fit="cover"
                      src={ post.thumbnail }
                      fallbackSrc="https://placehold.co/450x250?text=Placeholder"
                      alt={ `image-${'placeholder'}` }
                      className="post-block-image" />

  console.log('post', post)

  return (
    <div className="post-block">
      <Link href={ `/guides/${post.slug}` }>
        { imgElement }
      </Link>
      <div className="post-block-content">
        <div className="post-block-title">
          <Link href={ `/guides/${post.slug}` }>{ post.title }</Link>
        </div>
        <div className="post-block-excerpt">{ getPostDate(post.created_at) }</div>
      </div>
    </div>
  );
}

export default PostBlock;
