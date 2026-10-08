import CommentCard from "@/components/comments/CommentCard"
import NewCommentWrapper from "@/components/comments/NewCommentWrapper"
import FullPostCard from "@/components/posts/FullPostCard"
import { getComment, getFullPost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await getFullPost(slug)
  const { data: comment } = await getComment()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col grow w-4/5">
        {data && 
        <>
          <FullPostCard post={data} />
          <CommentCard comment={comment} />
        </>
        }
      </div>
      {user && <NewCommentWrapper />}
    </div>
  )
}

export default PostPage
