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
      <h2 className="mb-4 md:text-2xl">Latest Posts</h2>
      {data &&
        data.map((post) => (
          <Link
            href={`/${post.slug}`}
            key={post.id}
            className="border-2 border-accent-one p-4 flex mb-3 min-h-30 items-center hover:bg-[#1d201b]"
          >
            <div className="bg-accent-two w-1 min-h-30 mr-4"></div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <h3 className="font-bold text-[20px] md:text-2xl">{post.title}</h3>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default LandingPosts
