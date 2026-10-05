import LandingPosts from "@/components/posts/LandingPosts"
import { getLandingPosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await getLandingPosts(supabase);

  return (
    <div className="flex flex-col items-center py-10">
      <h2 className="heading font-bold text-pacifika">Welcome to the forum</h2>
      <LandingPosts posts={data} />
    </div>
  )
}
