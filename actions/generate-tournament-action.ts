"use server"

import { revalidatePath } from "next/cache"
import { getSignups } from "../src/lib/supabase/queries"
import { createClient } from "../src/lib/supabase/serverClient"

type GenerateTournamentProps = {
  tournamentId: string
  slug: string
}

const generateTournament = async ({ tournamentId, slug }: GenerateTournamentProps) => {
  const supabase = await createClient()
  
  const { data: signups, error: signupError} = await getSignups(tournamentId)

  if (signupError) throw signupError

  if (!signups || signups.length === 0) throw new Error("No applicants yet.")

  const filteredSignups = signups

  const teams = filteredSignups
    .map((signup) => signup.team_name)
    .filter((team, index, teams) => teams.indexOf(team) === index)

  const teamIds = teams.map((team) => filteredSignups.find((signup) => signup.team_name === team)!.id)

  const shuffledTeams = teamIds.sort(() => Math.random() - 0.5)

  const bracketRows = []

  for (let i = 0; i < shuffledTeams.length; i += 2) {
    const teamA = shuffledTeams[i]
    const teamB = shuffledTeams[i + 1] ?? null

    bracketRows.push({
      tournament_id: tournamentId,
      team_name: teamA,
      opponent_id: teamB,
      round_number: 1,
      game_number: bracketRows.length + 1,
    })
  }

  let totalRounds = Math.ceil(shuffledTeams.length / 2)
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
  
  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath(`/tournament/${slug}`)
  return { success: true }
}

export default generateTournament