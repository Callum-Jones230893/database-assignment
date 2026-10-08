"use client"

import { getLandingPosts, LandingPostType } from "@/lib/supabase/queries"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/browserClient"
import { Link } from "@/components/ui/link"
import { Card } from "@/components/ui/card/index.web"

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
    <>
      {data &&
        data.map((post) => (
          <Link
            href={`/${post.slug}`}
            key={post.id}
            className="flex items-center p-4 mb-4 rounded-2xl w-4/5"
          >
            <Card size="default">
                <h3 className="font-bold text-2xl">{post.title}</h3>
                <p className="text-right">Posted by {post.author.username}</p>
            </Card>
          </Link>
        ))}
    </>
  )
}

export default LandingPosts
