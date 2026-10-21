import { BracketsManager } from "brackets-manager"
import { InMemoryDatabase } from "brackets-memory-db"
import { createClient } from "../supabase/browserClient"
import { Match } from "brackets-model"

const supabase = createClient()

const generateTournament = async (tournamentId: string) => {
  const { data: signups, error: signupError } = await supabase
    .from("signups")
    .select("id")
    .eq("tournament_id", tournamentId)

  if (signupError) throw signupError
  if (!signups || signups.length === 0) throw new Error("No applicants yet.")

  const signup = signups.map((signup) => signup.id)

  const shuffledPlayers = signup?.sort(() => Math.random() - 0.5)

  const tournamentData = new InMemoryDatabase()
  const manager = new BracketsManager(tournamentData)

  await manager.create.stage({
    tournamentId: tournamentId,
    name: "Test",
    type: "double_elimination",
    seeding: shuffledPlayers,
  })

  const generatedMatch = await manager.get.tournamentData(tournamentId)

  const brackets = generatedMatch.match.map((game: Match) => {
    const playerOne = game.opponent1?.id && String(game.opponent1.id) !== "1" 
      ? String(game.opponent1.id) 
      : null

    const playerTwo = game.opponent2?.id && String(game.opponent2.id) !== "1" 
      ? String(game.opponent2.id) 
      : null

    return {
      tournament_id: tournamentId,
      game_number: Number(game.id),
      bracket_number: Number(game.group_id),
      player_one: playerOne,
      player_two: playerTwo,
    }
  })

  await supabase.from("brackets")
    .delete()
    .eq("tournament_id", tournamentId)
    
  const { error: createError } = await supabase
    .from("brackets")
    .insert(brackets)

  if (createError) throw createError
}

export default generateTournament