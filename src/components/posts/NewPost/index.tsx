"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { createPostSchema } from "../../../../actions/schemas"
import { CreatePost } from "../../../../actions/post-action"

const NewPost = () => {
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(createPostSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: CreatePost,
  })

  return (
    <div>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col w-md m-auto p-10 border border-black rounded-2xl mb-4">
        <input {...register("title")} placeholder="Title..." className="" />
        {errors.title && <p>{errors.title.message}</p>}

        <textarea {...register("content")} placeholder="Content..." className=""></textarea>
        {errors.content && <p>{errors.content.message}</p>}
        
        <button className="button cursor-pointer">Create</button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}

export default NewPost