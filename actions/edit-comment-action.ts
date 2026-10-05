"use server"

import z from "zod"
import { commentSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { uploadImage } from "@/lib/supabase/upload-image"
import { slugify } from "@/lib/supabase/slugify"
import { CreateComment } from "./comment-action"

type EditCommentProps = {
  commentData: z.infer<typeof commentSchema>
  commentId: string
}

export const EditPost = async({ commentData, commentId }: EditCommentProps) => {
  const parsedData = commentSchema.parse(commentData)
  const supabase = await createClient()
  
  const {data, error} = await supabase
    .from("comments")
    .select("*")
    .eq("id", commentId)
    .single()

  if (!data) {
    throw new Error ("Comment doesnt exist")
  }
  
  const imgFile = commentData.image?.get("image")

  let imgUrl

  if (imgFile !== "undefined") {
    if(!(imgFile instanceof File) && imgFile !== null && imgFile !== "undefined"){
      throw Error ("Image is not a valid format, please try again.")
    }
    imgUrl = imgFile ? await uploadImage(imgFile as File) : null
  } else {
    imgUrl = data.image
  }
  
  const {data: updatedComments} = await supabase
    .from("comments")
    .update({
      ...parsedData,
      image: imgUrl
    })
    .eq("id", commentId)
    .select("slug")
    .single()
    .throwOnError()

  redirect(`/${updatedComments.slug}`)
}