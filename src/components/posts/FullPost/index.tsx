"use client"

import { FullPostType } from "@/lib/supabase/queries"

type FullPostProps = {
  post: FullPostType | null
}

const FullPost = ({ post }: FullPostProps) => {
  return (
    <div className="flex flex-col items-center my-[5%]">
      {post && (
        <div className="border-2 border-blue-500 p-4 mb-4 rounded-2xl shadow-xl shadow-blue-300 w-8/10">
          <h3 className="font-bold text-2xl">{post.title}</h3>
          <p className="text-right">Posted by {post.author.username}</p>
          <div>
            <p className="">{post.content}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default FullPost
