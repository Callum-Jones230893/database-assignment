import { v4 as uuidv4 } from 'uuid';
import { createClient } from "./serverClient";

export const uploadImage = async (image: File[]) => {
  const supabase = await createClient()

  const multipleImages = image.map(async (images) => {
    const imageName: string[] = images.name.split(".")
    const uniqueImageName = `${imageName[0]}-${uuidv4()}-${imageName[1]}`

    const {data, error} = await supabase.storage.from("images").upload(uniqueImageName, images)

    if (error) {
      throw error
    }
    
    const {data: {publicUrl}} = await supabase.storage.from("images").getPublicUrl(data.path)

    return publicUrl
  })

  return await Promise.all(multipleImages)
}
