import PostWrapper from "@/components/posts/PostWrapper"
import { getComment, getFullPost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"
import DeleteButton from "./DeleteButton"

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await getFullPost(slug)
  const { data: { user } } = await supabase.auth.getUser()

  const { data: comments } = data ? await getComment(data.id) : { data: null }

  const isAuthor: boolean = user && data && user.id === data.author.id ? true : false

  return (
    <>
      <div className={`flex flex-col gap-10`}>
        {/* create as popup */}
        {data && <PostWrapper comments={comments} user={user} data={data} slug={slug} isAuthor={isAuthor} /> }
      </div>
    </>
  )
}

export default PostPage
