"use server"

import { createClient } from "@/lib/supabase/serverClient"

export const DeleteTournament = async (tournamentId: string) => {
  const supabase = await createClient();
  await supabase
    .from("tournament")
    .delete()
    .eq("id", tournamentId)
    .throwOnError()
    
  return { success: true }
}