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
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const NewPost = () => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const [storedValues, setStoredValues] = useState<PostValues | null>(null)
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

  const router = useRouter()

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
    onSuccess: (result) => {
      setConfirm(false)
      setStoredValues(null)
      setConfirmOpen(false)
      router.push(`/${result.slug}`)
    },
    onError: () => {
      toast.error("Something went wrong.")
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

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(handlePreConfirmation)} className="post-form">
        <label htmlFor="title" className="field-header">Title</label>
        <input {...register("title")} placeholder="title..." className="input" />
        {errors.title && <ErrorMessage error={errors.title.message!}/>}

        <label htmlFor="content" className="field-header">Content</label>
        <textarea {...register("content")} className="input" />
        {errors.content && <ErrorMessage error={errors.content.message!} />}

        <label htmlFor="image" className="field-header">Insert an image</label>
        <input type="file" multiple {...register("image")} className="input cursor-pointer" />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <div className="flex justify-center w-1/2 mx-auto py-10">
          <button><i className="fa-regular fa-circle-check fa-icon"></i></button>
          {error && <p>{error.message}</p>}
        </div>
        {confirmOpen && <ConfirmationModal handleConfirmation={handleConfirmation} setNewChange={setConfirmOpen} />}
      </form>
    </div>
  )
}

export default NewPost