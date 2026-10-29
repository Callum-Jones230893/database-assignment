"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { getProfile } from "@/lib/supabase/queries"
import { slugify } from "@/lib/supabase/slugify"

type TournamentSignupProps = {
  name: string
  classroom: string
  tournamentId: string
  tournamentName: string
}

export const TournamentSignup = async ({ name, classroom, tournamentId, tournamentName }: TournamentSignupProps) => {
  const supabase = await createClient()
  const { data: {user} } = await supabase.auth.getUser()
  const { data: profile } = await getProfile(user!.id)

  const slug = slugify(tournamentName)

  const { error } = await supabase
    .from("signups")
    .insert({
      tournament_id: tournamentId,
      name: name,
      user_name: profile?.username ? profile.username : null,
      classroom: classroom,
      slug: slug
  })

  if (error) {
    console.log(error.message)
    return { error: "Failed to signup, please try again later." }
  }

  revalidatePath(`/${slug}`)
  return { success: true }
}