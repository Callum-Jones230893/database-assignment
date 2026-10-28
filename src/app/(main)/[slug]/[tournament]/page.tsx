import SignupWrapper from "@/components/signups/SignupWrapper"
// import TournamentWrapper from "@/components/tournaments/TournamentWrapper"
import { getApplicants, getBrackets, getSignups, getTournament } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"

const TournamentPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await getTournament(slug)
  const { data: applicants } = await getApplicants(data.applicants)
  const { data: signups } = await getSignups(data.signups)
  // const { data: brackets } = await getBrackets(data!.tournament_name)

  return (
    <>
      <div className={`flex flex-col gap-10`}>
        {/* {data && data.id && brackets && <TournamentWrapper tournamentId={data?.id} data={brackets} />} */}
        <SignupWrapper applicants={applicants} signups={signups} user={data} />
      </div>
    </>
  )
}

export default TournamentPage
