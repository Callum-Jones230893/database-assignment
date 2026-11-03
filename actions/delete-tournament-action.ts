"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const DeleteTournament = async (tournamentId: string) => {
  const supabase = await createClient();
  await supabase
    .from("tournament")
    .delete()
    .eq("id", tournamentId)
    .throwOnError()
    
  redirect("/")
}