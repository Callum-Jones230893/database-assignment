"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { createPostSchema } from "../../../../actions/schemas"
import { CreatePost } from "../../../../actions/post-action"
import ErrorMessage from "@/components/ErrorMessage"
import z from "zod"
import { useState } from "react"
import ConfirmationModal from "@/components/ConfirmationModal"

const NewPost = () => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const [storedValues, setStoredValues] = useState<PostValues | null>(null)
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [newPost, setNewPost] = useState<boolean>(false)

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
  
  type PostValues = z.infer<typeof postImageSchema>

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(postImageSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: (values: PostValues) =>
      CreatePost({
        title: values.title,
        content: values.content,
        image: values.image && values.image.length > 0
          ? values.image
          : undefined
      }),
    onSuccess: () => {
      setConfirm(false)
      setStoredValues(null)
      setConfirmOpen(false)
    }
  })

  const handlePreConfirmation = (values: PostValues) => {
    setStoredValues(values)
    setConfirm(true)
    setConfirmOpen(true)
  }

  const handleConfirmation = () => {
    storedValues && mutate(storedValues)
    setConfirmOpen(false)
  }

  const handleClick = () => {
    setNewPost(false)
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(handlePreConfirmation)} className="post-form">
        <label htmlFor="title" className="field-header">Title</label>
        <input {...register("title")} placeholder="title..." className="input w-1/2 mx-auto pb-3 md:pb-6" />
        {errors.title && <ErrorMessage error={errors.title.message!}/>}

        <label htmlFor="content" className="field-header">Content</label>
        <textarea {...register("content")} className="input w-1/2 mx-auto pb-3 md:pb-6" />
        {errors.content && <ErrorMessage error={errors.content.message!} />}

        <label htmlFor="image" className="field-header">Insert an image</label>
        <input type="file" multiple {...register("image")} className="input w-1/2 mx-auto pb-3 md:pb-6 " />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <div className="flex justify-between w-1/2 mx-auto py-10">
          <button className="button cursor-pointer">Submit</button>
          {error && <p>{error.message}</p>}

          <div className="button cursor-pointer" onClick={handleClick}>
            Cancel
          </div>
        </div>
        {confirmOpen && <ConfirmationModal handleConfirmation={handleConfirmation} setNewChange={setNewPost} />}
      </form>
    </div>
  )
}

export default NewPost