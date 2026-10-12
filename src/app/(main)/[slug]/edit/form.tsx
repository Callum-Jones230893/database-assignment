"use client"

import ErrorMessage from "@/components/ErrorMessage"
import { type Tables } from "@/lib/supabase/database.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"
import { createPostSchema } from "../../../../../actions/schemas"
import { EditPost } from "../../../../../actions/edit-post-action"

const EditPageForm = ({ initialValues, postId }: {initialValues: Pick<Tables<"post">, "title" | "content" | "image">, postId: string}) => {
  const postImageSchema = createPostSchema.omit({image: true}).extend({image: z.unknown().transform(value => {return value as FileList}).optional()})

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(postImageSchema),
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content || undefined,
      image: initialValues.image || undefined
    }
  })

  const { mutate, error } = useMutation({
    mutationFn: EditPost
  })

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit((values) => {
        let newImage = undefined
        
        if (values.image && typeof values.image !== "string") {
          newImage = new FormData()
          newImage.append("image", values.image[0])
        }
        mutate({postData: {
          title: values.title,
          content: values.content,
          image: newImage
        },
          postId
        })
      })} 
        className="flex flex-col w-md m-auto p-10 border border-sushi rounded-2xl mb-4">
        <label htmlFor="title">Title</label>
        <input {...register("title")} placeholder="title..." className="input" />
        {errors.title && <ErrorMessage error={errors.title.message!}/>}

        <label htmlFor="content">Content</label>
        <textarea {...register("content")} className="input" />
        {errors.content && <ErrorMessage error={errors.content.message!} />}

        <img src={initialValues.image!} alt="" />

        <label htmlFor="image">Update an image</label>
        <input type="file" {...register("image")} className="input" />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <button className="button cursor-pointer">Submit</button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}

export default EditPageForm