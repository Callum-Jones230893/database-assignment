import TournamentWrapper from "@/components/tournaments/TournamentWrapper"
import { getSignups, getTournament } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"

const TournamentPage = async ({ params }: { params: { tournamentslug: string } }) => {
  const { tournamentslug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: tournament } = await getTournament(tournamentslug)
  const { data: signups } = await getSignups(tournament!.id)

  const isCreator: boolean = user && tournament && user.id === tournament.created_by.id ? true : false

  return (
    <div className={`flex flex-col gap-10`}>
      {tournament && <TournamentWrapper tournament={tournament} signups={signups} isCreator={isCreator} />}
    </div>
  )
}

export default TournamentPage
