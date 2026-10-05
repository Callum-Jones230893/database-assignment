"use client"

import { getLandingPosts, LandingPostType } from "@/lib/supabase/queries"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/browserClient"

type LandingPostProps = {
  posts: LandingPostType | null
}

const LandingPosts = ({ posts }: LandingPostProps) => {
  const supabase = createClient()
  const { data } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await getLandingPosts(supabase)
      if (error) throw new Error()

      return data
    },
    initialData: posts,
    staleTime: 1000,
  })

  return (
    <div className="w-8/10">
      {data &&
        data.map((post) => (
          <Link
            href={`/${post.slug}`}
            key={post.id}
            className="border-2 border-blue-500 p-4 block mb-4 rounded-2xl shadow-xl shadow-blue-300"
          >
            <h3 className="font-bold text-2xl">{post.title}</h3>
            <p className="text-right">Posted by {post.author.username}</p>
          </Link>
        ))}
    </div>
  )
}

export default LandingPosts
