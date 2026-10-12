"use client"

import { Card } from "@/components/ui/card/index.web"
import { CommentType } from "@/lib/supabase/queries"
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
    <div className="flex flex-col items-start">
      {comment &&
        <div>
          {!comment.parent_id && 
          <Card size="sm" >
            <div className="flex w-full justify-between">
              <p>{comment.content}</p>
              <p>{comment.commenter.username}</p>
            </div>
            {isAuthor || (userId === comment.commenter.id) ? <DeleteCommentButton id={comment.id} slug={slug} /> : ""}
            {user && comment && 
            <div>
              <NewCommentWrapper postId={postId} slug={slug} parentId={comment.id} />
            </div>}
          </Card>}
        </div>
      }
    </div>
  )
}

export default CommentCard
