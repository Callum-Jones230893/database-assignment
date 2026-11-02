import PostedTournamentWrapper from "@/components/tournaments/TournamentWrapper"
import { getSignups, getTournament } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"

const TournamentPage = async ({ params }: { params: { slug: string } }) => {
  

  const { slug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: tournament } = await getTournament(slug)

  if (!tournament) {
    return <div>Tournament not found!</div>
  }

  const { data: signups } = await getSignups(tournament!.id)

  const isCreator: boolean = user && tournament && user.id === tournament.created_by.id ? true : false

  return (
    <div className="flex flex-col my-[2%] w-full">
      {tournament && <PostedTournamentWrapper tournament={tournament} signups={signups} isCreator={isCreator} />}
    </div>
  )
}

export default TournamentPage
