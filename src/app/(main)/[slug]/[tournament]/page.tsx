import TournamentWrapper from "@/components/tournaments/TournamentWrapper"
import { getBrackets, getTournament } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"

const TournamentPage = async ({ params }: { params: { title: string } }) => {
  const { title } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await getTournament(title)
  const { data: brackets } = await getBrackets(data!.tournament_name)

  return (
    <>
      <div className={`flex flex-col gap-10`}>
        {data && data.id && brackets && <TournamentWrapper tournamentId={data?.id} data={brackets} />}
      </div>
    </>
  )
}

export default TournamentPage
