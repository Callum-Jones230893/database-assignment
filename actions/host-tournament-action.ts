"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { createTournamentSchema } from "./schemas"
import z from "zod"
import { slugify } from "@/lib/supabase/slugify"

export const HostTournament = async(tournamentDetails :z.infer<typeof createTournamentSchema>) => {
  const supabase = await createClient()
  const validatedData = createTournamentSchema.safeParse(tournamentDetails)
  
  const { data: { user }} = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "You must be signed in to host a tournament." }
  }

  if (!validatedData.success) {
    return { error: "Incorrect form data." }
  }

  const { data: profile } = await supabase
    .from("profile") 
    .select("username")
    .eq("id", user.id)
    .single()

  if (!profile) {
    return { error: "Profile not found." }
  }

  const { title } = validatedData.data

  const slug = slugify(title)

  const { error } = await supabase
    .from("tournament")
    .insert({
      tournament_name: title,
      created_by: user.id,
      slug: slug,
    })
    .select("tournament_name")

  if (error) {
    console.error(error.message)
    return { error: "Couldn't create tournament, please try again later." }
  }

  redirect(`/tournaments/${slug}`)
}