import React from "react";
import { Post } from '@/app/types';

type Props = {
  post: Post
}

const PostView = ({ post }: Props) => {
  return (
    <div id="post-view">
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
}

export default PostView;
