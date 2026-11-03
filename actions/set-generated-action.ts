"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "../src/lib/supabase/serverClient"
import { redirect } from "next/navigation"

export const setGenerated = async (tournamentId: string, slug: string) => {
  const supabase = await createClient()

  const { error: generationError } = await supabase
    .from("tournament")
    .update({
      generated: true
    })
    .eq("id", tournamentId)

  if (generationError) {
    return { error: "Couldn't generate tournament, please try again later." }
  }

  revalidatePath(slug)
  redirect(slug)
}