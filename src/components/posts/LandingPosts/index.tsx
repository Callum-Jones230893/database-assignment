"use client"

import { getLandingPosts, LandingPostType } from "@/lib/supabase/queries"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/browserClient"
import Link from "next/link"

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
    <div className="flex-col grow w-8/10">
      {data &&
        data.map((post) => (
          <Link
            href={`/${post.slug}`}
            key={post.id}
            className="border-2 border-orange-500 p-4 block mb-4 rounded-2xl shadow-sm shadow-orange-400 min-h-[5%]"
          >
            <div>
                <h3 className="font-bold text-2xl">{post.title}</h3>
                <p className="text-right">Posted by {post.author.username}</p>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default LandingPosts
