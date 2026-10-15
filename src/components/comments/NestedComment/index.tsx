"use client"

import { User } from "@supabase/auth-js"
import { MappedCommentType } from "../CommentCard"
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

const NestedComment = ({
  comment,
  isAuthor,
  userId,
  postId,
  slug,
  user,
}: CommentProps) => {
  return (
    <>
      {comment?.parent_id && (
        <div className="flex flex-col items-end">
          <div className="w-7/10">
            <div className="border border-orange-400 p-4 mb-4 rounded-2xl w-full">
              <p>{comment.content}</p>
              <p>{comment.commenter.username}</p>
              <div className="flex justify-end">
                {isAuthor || userId === comment.commenter.id ? (
                  <DeleteCommentButton id={comment.id} slug={slug} />
                ) : (
                  ""
                )}
                {user && comment && (
                  <NewCommentWrapper
                    postId={postId}
                    slug={slug}
                    parentId={comment.id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NestedComment
