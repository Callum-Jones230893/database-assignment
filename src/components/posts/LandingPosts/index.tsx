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
    <div className="flex-col w-8/10 mb-10">
      <h2 className="mb-4 text-2xl">Latest Posts</h2>
      {data &&
        data.map((post) => (
          <Link
            href={`/${post.slug}`}
            key={post.id}
            className="border-2 border-accent-one p-4 flex mb-3 h-30 items-center hover:bg-[#20251b]"
          >
            <div className="bg-[#fa7000] w-1 h-full mr-4"></div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <h3 className="font-bold text-2xl">{post.title}</h3>
                {/* add shortened version of the content */}
              </div>
              <div className="h-30 flex w-40 items-end pb-4 gap-4">
                <p>Author:</p>
                <p>{post.author.username}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default LandingPosts
