"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { commentSchema } from "./schemas"
import z from "zod"
import { uploadImage } from "@/lib/supabase/upload-image"

export const CreateComment = async(commentContent:z.infer<typeof commentSchema>) => {
  const supabase = await createClient()
  const validateData = commentSchema.safeParse(commentContent)

  const { data: { user }} = await supabase.auth.getUser()

  if(!user) {
    return { error: "You must be logged in to comment on this post." }
  }

  if(!validateData.success) {
    return { error: "Incorrect form data." }
  }

  const { data: post } = await supabase
    .from("post")
    .select("id")
    .single()

  if (!post) {
    return { error: "Post not found" }
  }

  const { data: profile } = await supabase
    .from("profile")
    .select("username")
    .eq("id", user.id)
    .single()

  if (!profile) {
    return { error: "Profile not found." }
  }

  const { content } = validateData.data

  // const imgFile = image.get("image")

  // if(!(imgFile instanceof File) && imgFile !== null && imgFile !== "undefined"){
  //   throw Error ("Image is not a valid format, please try again.")
  // }

  // const imgUrl = (imgFile && imgFile !== "undefined") ? await uploadImage(imgFile as File) : null

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: post.id,
      commenter: user.id,
      content: content,
      // image: z.instanceof(FormData).optional()
    })
    .select("content")

  if (error) {
    console.log(error.message)
    return { error: "Couldn't comment, please try again later." }
  }

  redirect("/")
}