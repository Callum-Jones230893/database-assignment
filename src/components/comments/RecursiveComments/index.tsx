import { CommentType } from "@/lib/supabase/queries"
import { MappedCommentType } from "../CommentCard"
import DeleteCommentButton from "../DeleteCommentButton"
import { User } from "@supabase/auth-js"
import NewCommentWrapper from "../NewCommentWrapper"

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
    <div className="flex flex-col pl-4 border-l border-orange-200/20">
      <ul className="space-y-1">
        {childComments.map((comment: MappedCommentType) => (
          <li key={comment.id} className="mt-2">
            <div className="">
              <div className="border border-orange-400 p-4 mb-4 rounded-2xl w-full">
                <p>{comment.content}</p>
                <p>{comment.commenter.username}</p>
                <div className="flex justify-end">
                  {isAuthor || (userId === comment.commenter.id) ? <DeleteCommentButton id={comment.id} slug={slug} /> : ""}
                  {user && comment && <NewCommentWrapper postId={postId} slug={slug} parentId={comment.id} />}
                </div>
              </div>
            </div>
            <NestedComments comments={comments} parentId={comment.id} isAuthor={isAuthor} userId={user && userId} postId={postId} slug={slug} user={user} />
          </li>
        ))}
      </ul>
    </div>
  )
} 

export default NestedComments

