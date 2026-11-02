"use server"

import { revalidatePath } from "next/cache"
import { getSignups } from "../src/lib/supabase/queries"
import { createClient } from "../src/lib/supabase/serverClient"
import { redirect } from "next/navigation"

type GenerateTournamentProps = {
  tournamentId: string
  slug: string
}

const generateTournament = async ({ tournamentId, slug }: GenerateTournamentProps) => {
  const supabase = await createClient()
  
  const { data: signups, error: signupError} = await getSignups(tournamentId)

  if (signupError) throw signupError

  if (!signups || signups.length === 0) throw new Error("No applicants yet.")

  const filteredSignups = signups.filter((signup) => signup.tournament_id.id === tournamentId)

  const signupIds = filteredSignups.map((signup) => signup.id)

  const shuffledSignup = signupIds.sort(() => Math.random() - 0.5)

  const bracketRows = []

  for (let i = 0; i < shuffledSignup.length; i += 2) {
    const teamA = shuffledSignup[i]
    const teamB = shuffledSignup[i + 1] ?? null

    bracketRows.push({
      tournament_id: tournamentId,
      team_name: teamA,
      opponent_id: teamB,
      round_number: 1,
      game_number: bracketRows.length + 1,
    })
  }

  let totalRounds = Math.ceil(shuffledSignup.length / 2)
  let round = 2

  while (totalRounds > 1) {
    totalRounds = Math.ceil(totalRounds / 2)

    for (let game = 1; game <= totalRounds; game++) {
      bracketRows.push({
        tournament_id: tournamentId,
        team_name: null,
        opponent_id: null,
        round_number: round,
        game_number: game,
        winner_id: null,
      })
    }

    round++
  }
  
  const { error } = await supabase
    .from("brackets")
    .insert(bracketRows)
  
  if (error) throw error

  revalidatePath(`/${slug}`)
}

export default generateTournament