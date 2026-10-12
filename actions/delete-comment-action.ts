"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"

export const DeleteComment = async (commentId: string) => {
  const supabase = await createClient();
  await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .throwOnError()
    
  redirect("/")
}