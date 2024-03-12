import React from "react";
import Link from 'next/link'
import { Image } from '@mantine/core';
import { Post } from '@/app/types';

type Props = {
  post: Post
}

const PostBlock = ({ post }: Props) => {
  let imgElement =  <Image
                      fit="cover"
                      src={ post.thumb?.sourceUrl }
                      fallbackSrc="https://placehold.co/450x250?text=Placeholder"
                      alt={ `image-${post.thumb?.id ?? 'placeholder'}` }
                      className="post-block-image" />;

  return (
    <div className="post-block">
      <Link href={ post.slug }>
        { imgElement }
      </Link>
      <div className="post-block-content">
        <div className="post-block-title">
          <Link href={ post.slug }>{ post.title }</Link>
        </div>
        <div className="post-block-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
      </div>
    </div>
  );
}

export default PostBlock;
