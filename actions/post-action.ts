"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { createPostSchema } from "./schemas"
import z from "zod"
import { slugify } from "@/lib/supabase/slugify"
import { uploadImage } from "@/lib/supabase/upload-image"

export const CreatePost = async(postContent:z.infer<typeof createPostSchema>) => {
  const supabase = await createClient()
  const validatedData = createPostSchema.safeParse(postContent)
  
  const { data: { user }} = await supabase.auth.getUser()
  
  if (!user) {
    return { error: "You must be signed in to create a post." }
  }

  if (!validatedData.success) {
    return { error: "Incorrect form data." }
  }

  const { data: profile } = await supabase
    .from("profile") 
    .select("username")
    .eq("id", user.id)
    .single()

  if (!profile) {
    return { error: "Profile not found." }
  }

  const { title, content, image } = validatedData.data

  const slug = slugify(title)

  const imgFile = image!.get("image")

  if(!(imgFile instanceof File) && imgFile !== null && imgFile !== "undefined"){
    throw Error ("Image is not a valid format, please try again.")
  }

  const imgUrl = (imgFile && imgFile !== "undefined") ? await uploadImage(imgFile as File) : null

  const { data, error } = await supabase
    .from("post")
    .insert({
      author: user.id,
      // category: category,
      title: title,
      content: content,
      slug: slug,
      image: imgUrl
    })
    .select("title, content")

  if (error) {
    console.error(error.message)
    return { error: "Couldn't create post, please try again later." }
  }

  redirect("/")
}