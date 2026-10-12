"use server"

import z from "zod"
import { createPostSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { slugify } from "@/lib/supabase/slugify";
import { uploadImage } from "@/lib/supabase/upload-image"

export const EditPost = async({ postData, postId }: {postData:z.infer<typeof createPostSchema>, postId: string}) => {
  const parsedData = createPostSchema.parse(postData)
  const supabase = await createClient()

  const {data, error} = await supabase
    .from("post")
    .select("*")
    .eq("id", postId)
    .single()

  if (!data) {
    throw new Error ("post doesnt exist")
  }
  
  const imgFile = postData.image?.get("image")

  let imgUrl

  if (imgFile !== "undefined") {
    if(!(imgFile instanceof File) && imgFile !== null && imgFile !== "undefined"){
      throw Error ("Image is not a valid format, please try again.")
    }
    imgUrl = imgFile ? await uploadImage(imgFile as File) : null
  } else {
    imgUrl = data.image
  }


  const {data: updatedPosts} = await supabase
    .from("post")
    .update({
      ...parsedData,
      slug: slugify(parsedData.title),
      image: imgUrl
    })
    .eq("id", postId)
    .select("slug")
    .single()
    .throwOnError()

  redirect(`/${updatedPosts.slug}`)
}