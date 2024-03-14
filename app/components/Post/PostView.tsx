import React from "react";
import { Post } from '@/app/types';
import { getPostDate } from "@/utils/post";

type Props = {
  post: Post
}

const PostView = ({ post }: Props) => {
  const isModified: boolean = post.published_at != post.updated_at
  const postDate: string    = getPostDate(isModified ? post.updated_at : post.published_at)

  return (
    <div id="post-view">
      <h1>{ post.title }</h1>
      <div id="post-view-date">
        <span>{ isModified ? `Last updated:` : `Published:` }</span>
        { postDate }
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
}

export default PostView
