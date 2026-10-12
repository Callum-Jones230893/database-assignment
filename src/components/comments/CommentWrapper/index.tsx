"use client"

import { CommentType } from "@/lib/supabase/queries"
import { User } from "@supabase/auth-js"
import CommentCard from "../CommentCard"
import NestedComments from "../RecursiveComments"

type CommentWrapperProps = {
  isAuthor: boolean
  userId: string | null
  postId: string
  comments: CommentType
  slug: string
  user: User | null
}

const CommentWrapper = ({ comments, isAuthor, userId, postId, slug, user }: CommentWrapperProps) => {
  const baseComments = comments?.filter((baseComment) => baseComment.parent_id === null)
  const hasParentComment = comments?.filter((comment) => comment.parent_id !== null)

  return (
    <>
      {/* {comments &&
        baseComments?.map((comment) => (
        <div key={comment.id} className="mt-2">
          <CommentCard comment={comment} isAuthor={isAuthor} userId={user && userId} postId={postId} slug={slug} user={user} />
          {comment.id &&  hasParentComment?.filter((child) => comment.id === child.parent_id).map((comment) => (
            <div key={comment.id}>
              <NestedComment comment={comment} isAuthor={isAuthor} userId={user && userId} postId={postId} slug={slug} user={user} />
            </div>
          ))}
        </div>
      ))} */}
      <NestedComments comments={comments} parentId={null} />
    </>
  )
}

export default CommentWrapper
