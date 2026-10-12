import { CommentType } from "@/lib/supabase/queries"
import { MappedCommentType } from "../CommentCard"

type NestedCommentsProps = {
  comments: CommentType
  parentId: string | null
}

const NestedComments = ({ comments, parentId = null }: NestedCommentsProps) => {
  const childComments = comments.filter((item) => item.parent_id === parentId)

  if (childComments.length === 0) return null

  return (
    <div className="flex flex-col pl-4 border-l border-gray-200">
      <ul className="space-y-1">
        {childComments.map((comment: MappedCommentType) => (
          <li key={comment.id} className="mt-2">
            <div className="font-medium">{comment.id}</div>
            <NestedComments comments={comments} parentId={comment.id} />
          </li>
        ))}
      </ul>
    </div>
  )
} 

export default NestedComments

