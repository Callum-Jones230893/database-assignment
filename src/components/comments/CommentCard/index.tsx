"use client"

import NewCommentWrapper from "../NewCommentWrapper"
import { User } from "@supabase/auth-js"
import DeleteCommentButton from "../DeleteCommentButton"

export type MappedCommentType = {
  id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  commenter: {
  id: string;
  username: string;
  }
}

type CommentProps = {
  isAuthor: boolean
  userId: string | null
  postId: string
  comment: MappedCommentType | null
  slug: string
  user: User | null
}

const CommentCard = ({ comment, isAuthor, userId, postId, slug, user }: CommentProps) => {
  return (
    <div className="flex flex-col items-end">
      {comment &&
        <>
          {!comment.parent_id && 
          <div className="w-9/10">
            <div className="border border-orange-400 p-4 mb-4 rounded-2xl w-full">
              <p>{comment.content}</p>
              <p>{comment.commenter.username}</p>
              <div className="flex justify-end">
                {isAuthor || (userId === comment.commenter.id) ? <DeleteCommentButton id={comment.id} slug={slug} /> : ""}
                {user && comment && <NewCommentWrapper postId={postId} slug={slug} parentId={comment.id} />}
              </div>
            </div>
          </div>}
        </>
      }
    </div>
  )
}

export default CommentCard
