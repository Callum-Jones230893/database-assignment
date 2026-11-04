"use server"

import z from "zod"
import { createPostSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { uploadImage } from "@/lib/supabase/upload-image"
import { revalidatePath } from "next/cache"

export const EditPost = async({ postData, postId }: {postData:z.infer<typeof createPostSchema>, postId: string}) => {
  const parsedData = createPostSchema.parse(postData)
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", postId)
    .single()

  if (!data) {
    throw new Error ("Post doesn't exist")
  }
  
  const images = parsedData.image

  let updatedImages

  if (images) {
    let newImageFiles: File[] = []
    
    if (Array.isArray(images)) {
      newImageFiles = images.filter((item): item is File => item instanceof File)
    } else if (images instanceof File) {
      newImageFiles = [images]
    }

    if (newImageFiles.length > 0) {
      updatedImages = await uploadImage(newImageFiles)
    } else {
      updatedImages = data.image || []
    }
  } else {
    updatedImages = data.image || []
  }

  const {data: updatedPosts, error: updateError} = await supabase
    .from("post")
    .update({
      ...parsedData,
      image: updatedImages
    })
    .eq("id", postId)
    .select("slug")
    .single()
    .throwOnError()

  if (updateError) {
    return { error: "Couldn't update, please try again later." }
  }

  let slug = updatedPosts.slug

  revalidatePath(`/${updatedPosts.slug}`)
  return { success: true, slug }
}