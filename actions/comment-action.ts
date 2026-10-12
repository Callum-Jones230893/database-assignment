"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { commentSchema } from "./schemas"
import z from "zod"
import { revalidatePath } from "next/cache"

export type CreateCommentProps = {
  commentContent: z.infer<typeof commentSchema>
  slug: string
  postId: string
  parentId: string | null
}

export const CreateComment = async({commentContent, postId, slug, parentId}: CreateCommentProps) => {
  const supabase = await createClient()
  const validateData = commentSchema.safeParse(commentContent)

  const { data: { user }} = await supabase.auth.getUser()

  if(!user) {
    return { error: "You must be logged in to comment on this post." }
  }

  if(!validateData.success) {
    return { error: "Incorrect form data." }
  }

  const { error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      parent_id: parentId,
      commenter: user.id,
      content: validateData.data.content,
  })

  if (error) {
    console.log(error.message)
    return { error: "Couldn't comment, please try again later." }
  }
  
  revalidatePath(`/${slug}`)
  return { success: true }
}