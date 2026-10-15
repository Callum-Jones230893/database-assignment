"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { createPostSchema } from "../../../../actions/schemas"
import { CreatePost } from "../../../../actions/post-action"
import ErrorMessage from "@/components/ErrorMessage"
import z from "zod"

const NewPost = () => {
  const postImageSchema = createPostSchema.omit({ image: true }).extend({
    image: z
      .unknown()
      .transform((value) => {
        if (value instanceof FileList) {
          return Array.from(value)
        }
        return [];
      })
      .optional()
  })

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(postImageSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: CreatePost,
  })

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit((values) => {
        const newImage = new FormData()
        if (values.image) {
          newImage.append("image", values.image[0])
        }
        mutate({
          title: values.title,
          content: values.content,
          image: values.image && values.image.length > 0 ? values.image : undefined
        })
      })} 
        className="flex flex-col w-md m-auto p-10 border border-sushi rounded-2xl mb-4">
        <label htmlFor="title">Title</label>
        <input {...register("title")} placeholder="title..." className="input" />
        {errors.title && <ErrorMessage error={errors.title.message!}/>}

        <label htmlFor="content">Content</label>
        <textarea {...register("content")} className="input" />
        {errors.content && <ErrorMessage error={errors.content.message!} />}

        <label htmlFor="image">Insert an image</label>
        <input type="file" multiple {...register("image")} className="input" />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <button className="button cursor-pointer">Submit</button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}

export default NewPost