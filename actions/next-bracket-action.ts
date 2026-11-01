"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"

type NextBracketProps = {
  bracketId: string
  winnerId: string
  slug: string
}

const nextBracket = async ({ bracketId, winnerId, slug }: NextBracketProps) => {
  const supabase = await createClient()

  const { data: teams, error } = await supabase
    .from("brackets")
    .select("*")
    .eq("id", bracketId)
    .single()

  if (error) throw error

  if (winnerId !== teams.team_name && winnerId !== teams.opponent_id) {
    throw new Error("Error declaring the winner.")
  }

  const { error: updateError } = await supabase
    .from("brackets")
    .update({ 
      winner_id: winnerId 
    })
    .eq("id", bracketId)

  if (updateError) throw updateError

  const nextRound = teams.round_number + 1
  const nextGame = Math.ceil(teams.game_number / 2)
  const { data: nextMatch, error: nextError } = await supabase
    .from("brackets")
    .select("id")
    .eq("tournament_id", teams.tournament_id)
    .eq("round_number", nextRound)
    .eq("game_number", nextGame)
    .maybeSingle()

  if (nextError) throw nextError


  if (nextMatch) {

  const updateWinner = teams.game_number % 2 === 1 ? { team_name: winnerId } : { opponent_id: winnerId }

    const { error: nextRoundError } = await supabase
      .from("brackets")
      .update(updateWinner)
      .eq("id", nextMatch.id)

    if (nextRoundError) throw nextRoundError
  }

  revalidatePath(`/tournaments/${slug}`)
} 

export default nextBracket