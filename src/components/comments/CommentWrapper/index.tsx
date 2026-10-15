"use client"

import { CommentType } from "@/lib/supabase/queries"
import { User } from "@supabase/auth-js"
import NestedComments from "../RecursiveComments"

type CommentWrapperProps = {
  isAuthor: boolean
  userId: string | null
  postId: string
  comments: CommentType
  slug: string
  user: User | null
}

const CommentWrapper = ({
  comments,
  isAuthor,
  userId,
  postId,
  slug,
  user,
}: CommentWrapperProps) => {
  return (
    <NestedComments
      comments={comments}
      parentId={null}
      isAuthor={isAuthor}
      userId={user && userId}
      postId={postId}
      slug={slug}
      user={user}
    />
  )
}

export default CommentWrapper
