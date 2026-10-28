"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { tournamentSignupSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"
import { getProfile } from "@/lib/supabase/queries"
import { slugify } from "@/lib/supabase/slugify"

type TournamentSignupProps = {
  username: string
  applicantName: string
  classroom: string
  tournamentId: string
  slug: string
}

export const TournamentSignup = async ({ username, applicantName, classroom, tournamentId, slug }: TournamentSignupProps) => {
  const supabase = await createClient()

  const { data } = await getProfile(username)

  const { error } = await supabase
    .from("signups")
    .insert({
      tournament_id: tournamentId,
      name: data?.username ? username : applicantName,
      user_name: data?.username ? username : null,
      applicant_name: applicantName ? applicantName : null '',
      classroom: classroom,
  })

  if (error) {
    console.log(error.message)
    return { error: "Failed to signup, please try again later." }
  }

  revalidatePath(`/${slug}`)
  return { success: true }
}