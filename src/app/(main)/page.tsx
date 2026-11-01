import LandingPosts from "@/components/posts/LandingPosts"
import { getLandingPosts } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"

export default async function Home() {
  const supabase = await createClient()
  const { data } = await getLandingPosts(supabase)

  return (
    <div className="flex flex-col w-full lg:w-1/2 mx-auto items-center">
      {data 
      ? <LandingPosts posts={data} /> 
      : <div>No posts made yet.</div>
      }
    </div>
  )
}
