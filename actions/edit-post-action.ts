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
  
  const imgs = parsedData.image

  let updatedImages

  if (imgs) {
    let newImageFiles: File[] = []
    
    if (Array.isArray(imgs)) {
      newImageFiles = imgs.filter((item): item is File => item instanceof File)
    } else if (imgs instanceof File) {
      newImageFiles = [imgs]
    }

    if (newImageFiles.length > 0) {
      updatedImages = await uploadImage(newImageFiles)
    } else {
      updatedImages = data.image || []
    }
  } else {
    updatedImages = data.image || []
  }


  const {data: updatedPosts} = await supabase
    .from("post")
    .update({
      ...parsedData,
      slug: slugify(parsedData.title),
      image: updatedImages
    })
    .eq("id", postId)
    .select("slug")
    .single()
    .throwOnError()

  redirect(`/${updatedPosts.slug}`)
}