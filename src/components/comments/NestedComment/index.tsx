"use client"

import { User } from "@supabase/auth-js"
import { MappedCommentType } from "../CommentCard"
import { Card } from "@/components/ui/card"
import DeleteCommentButton from "../DeleteCommentButton"
import NewCommentWrapper from "../NewCommentWrapper"

type CommentProps = {
  isAuthor: boolean
  userId: string | null
  postId: string
  comment: MappedCommentType | null
  slug: string
  user: User | null
}

const NestedComment = ({ comment, isAuthor, userId, postId, slug, user }: CommentProps) => {
  return (
    <>
      {comment?.parent_id &&
        <div>
          <Card size="nested" >
            <div className="flex w-full justify-between">
              <p>{comment.content}</p>
              <p>{comment.commenter.username}</p>
            </div>
            {isAuthor || (userId === comment.commenter.id) ? <DeleteCommentButton id={comment.id} slug={slug} /> : ""}
            {user && comment && 
            <div>
              <NewCommentWrapper postId={postId} slug={slug} parentId={comment.id} />
            </div>}
          </Card>
        </div>
      }
    </>
  )
}

export default NestedComment