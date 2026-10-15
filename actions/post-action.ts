"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { createPostSchema } from "./schemas"
import z from "zod"
import { slugify } from "@/lib/supabase/slugify"
import { uploadImage } from "@/lib/supabase/upload-image"
import { revalidatePath } from "next/cache"

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

  let imgFiles: File[] = []

  if (image) {
    if (Array.isArray(image)) {
      imgFiles = image.filter((item): item is File => item instanceof File)
    } else if (image instanceof File) {
      imgFiles = [image]
    }
  }

  const imgUrls = imgFiles.length > 0 ? await uploadImage(imgFiles) : null

  const { data, error } = await supabase
    .from("post")
    .insert({
      author: user.id,
      title: title,
      content: content,
      slug: slug,
      image: imgUrls
    })
    .select("title, content")

  if (error) {
    console.error(error.message)
    return { error: "Couldn't create post, please try again later." }
  }

  revalidatePath(`/${slug}`)
  redirect(`/${slug}`)
}