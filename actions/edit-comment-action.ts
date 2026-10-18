"use server"

import z from "zod"
import { commentSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"

type EditCommentProps = {
  commentData: z.infer<typeof commentSchema>
  commentId: string
  slug: string
}

export const EditComment = async({ commentData, commentId, slug }: EditCommentProps) => {
  const supabase = await createClient()
  const parsedData = commentSchema.parse(commentData)
  
  const {data, error} = await supabase
    .from("comments")
    .select("*")
    .eq("id", commentId)
    .single()

  if (!data) {
    throw new Error ("Comment doesnt exist")
  }
  
  const {data: updatedComments} = await supabase
    .from("comments")
    .update({
      ...parsedData,
    })
    .eq("id", commentId)
    .select("slug")
    .single()
    .throwOnError()

  redirect(`/${slug}`)
}