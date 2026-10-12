import CommentCard from "@/components/comments/CommentCard"
import NewCommentWrapper from "@/components/comments/NewCommentWrapper"
import FullPostCard from "../FullPostCard"
import { CommentType, FullPostType } from "@/lib/supabase/queries"
import { User } from "@supabase/auth-js"
import CommentWrapper from "@/components/comments/CommentWrapper"

type PostWrapperProps = {
  isAuthor: boolean
  data: FullPostType
  comments: CommentType | null
  user: User | null
  slug: string
}

const PostWrapper = ({ data, comments, user, slug, isAuthor }: PostWrapperProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col grow w-4/5">
        {data && 
          <>
            <FullPostCard post={data} />
            <CommentWrapper comments={comments} isAuthor={isAuthor} userId={user && user.id} postId={data!.id} slug={slug} user={user} />
          </>
        }
      </div>
      {user && data && <NewCommentWrapper postId={data.id} slug={slug} parentId={null} />}
    </div>
  )
}

export default PostWrapper