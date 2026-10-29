import { getSignups } from "../supabase/queries"
import { createClient } from "../supabase/serverClient"

const generateTournament = async (tournamentId: string) => {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: signups, error: signupError} = await getSignups(tournamentId)

  if (signupError) throw signupError

  // needed filter?
  const filteredSignups = signups.filter((signup) => signup.tournament_id.id === tournamentId)

  if (!signups || signups.length === 0) throw new Error("No applicants yet.")

  const signup = filteredSignups.map((signup) => signup.id)

  const shuffledPlayers = signup?.sort(() => Math.random() - 0.5)

  
}

export default generateTournament