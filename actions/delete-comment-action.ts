"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"

export const DeleteComment = async (commentId: string) => {
  const supabase = await createClient();
  await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    
  revalidatePath("/")
  return { success: true }
}