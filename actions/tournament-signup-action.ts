"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { slugify } from "@/lib/supabase/slugify"

type TournamentSignupProps = {
  name: string
  classroom: string
  team: string
  tournamentId: string
  tournamentName: string
}

export const TournamentSignup = async ({ name, classroom, team, tournamentId, tournamentName }: TournamentSignupProps) => {
  const supabase = await createClient()
  const { data: {user} } = await supabase.auth.getUser()
  
  const slug = slugify(tournamentName)

  const { error } = await supabase
    .from("signups")
    .insert({
      tournament_id: tournamentId,
      name: name,
      team_name: team,
      user_id: user?.id && user.id !== "null" ? user.id : null,
      classroom: classroom,
  })

  if (error) {
    console.log(error.message)
    return { error: "Failed to signup, please try again later." }
  }

  revalidatePath(`/tournaments/${slug}`)
  return { success: true, slug }
}