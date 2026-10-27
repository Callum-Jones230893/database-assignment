import { CommentType } from "@/lib/supabase/queries"
import DeleteCommentButton from "../DeleteCommentButton"
import { User } from "@supabase/auth-js"
import NewCommentWrapper from "../NewCommentWrapper"

export type MappedCommentType = {
  id: string
  parent_id: string | null
  content: string
  created_at: string
  commenter: {
    id: string
    username: string
  } | null
}

type NestedCommentsProps = {
  comments: CommentType
  parentId: string | null
  slug: string
  user: User | null
  isAuthor: boolean
  userId: string | null
  postId: string
}

const NestedComments = ({ comments, parentId = null, slug, user, isAuthor, userId, postId }: NestedCommentsProps) => {
  const childComments = comments.filter((item) => item.parent_id === parentId)

  if (childComments.length === 0) return null

  return (
    <div className="flex flex-col pl-4 border-l border-accent-one">
      <ul className="space-y-1">
        {childComments.map((comment: MappedCommentType) => (
          <li key={comment.id} className="mt-2">
            <div className="comment-card group">
              <p>{comment.content}</p>
              <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  {isAuthor || userId === comment.commenter!.id ? (
                    <DeleteCommentButton id={comment.id} slug={slug} />
                  ) : (
                    ""
                  )}
                </div>
                {user && comment && (
                  <NewCommentWrapper
                  postId={postId}
                  slug={slug}
                    parentId={comment.id}
                    />
                  )}
              </div>
              <p>{comment.commenter!.username}</p>
            </div>
            <NestedComments
              comments={comments}
              parentId={comment.id}
              isAuthor={isAuthor}
              userId={user && userId}
              postId={postId}
              slug={slug}
              user={user}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NestedComments
