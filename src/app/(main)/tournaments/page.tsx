import PostedTournamentsList from "@/components/tournaments/PostedTournamentsList"
import { getHostedTournaments } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient";

const PostedTournamentsPage = async () => {
  const supabase = await createClient()
  const { data: tournaments } = await getHostedTournaments(supabase)

  return (
    <div className="flex flex-col w-full lg:w-1/2 mx-auto items-center">
      {tournaments 
      ? <PostedTournamentsList tournaments={tournaments} /> 
      : <div>No upcoming tournaments, please check back later.</div>
      }
    </div>
  )
}

export default PostedTournamentsPage