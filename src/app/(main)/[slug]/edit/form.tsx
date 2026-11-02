"use client"

import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"
import { createPostSchema } from "../../../../../actions/schemas"
import { EditPost } from "../../../../../actions/edit-post-action"
import { Tables } from "@/lib/supabase/database.types"

const EditPageForm = ({ initialValues, postId }: {initialValues: Pick<Tables<"post">, "title" | "content" | "image">, postId: string}) => {
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
        let newImage =  values.image ?? []
        
        mutate({
          postData: {
            title: values.title,
            content: values.content,
            image: newImage.length > 0 ? newImage : undefined,
          },
          postId,
        })
      })} 
        className="post-form">
        <label htmlFor="title" className="field-header">Title</label>
        <input {...register("title")} placeholder="title..." className="input " />
        {errors.title && <ErrorMessage error={errors.title.message!}/>}

        <label htmlFor="content" className="field-header">Content</label>
        <textarea {...register("content")} className="input"/>
        {errors.content && <ErrorMessage error={errors.content.message!} />}

        <div className="grid grid-cols-3 grid-auto-flow-row w-1/2 mx-auto my-5 gap-y-10">
          {initialValues.image && initialValues.image!.map(img =>  
            <div key={img} className='w-25 h-auto'>
              <img src={img} alt={img} />
            </div>
          )}
        </div>
        

        <label htmlFor="image" className="field-header">Update your image</label>
        <input type="file" multiple {...register("image")} className="input cursor-pointer" />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <div className="flex justify-center w-1/2 mx-auto py-10">
          <button><i className="fa-regular fa-circle-check fa-icon"></i></button>
          {error && <p>{error.message}</p>}
        </div>
      </form>
    </div>
  )
}

export default EditPageForm