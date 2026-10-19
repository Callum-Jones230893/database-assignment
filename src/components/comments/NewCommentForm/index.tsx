"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { commentSchema } from "../../../../actions/schemas"
import z from "zod"
import { CreateComment } from "../../../../actions/comment-action"
import { Dispatch, SetStateAction, useState } from "react"
import ConfirmChoice from "@/components/ConfirmChoice"

export type CommentValues = z.infer<typeof commentSchema>

type CommentFormProps = {
  postId: string
  slug: string
  parentId: string | null
  setNewComment: Dispatch<SetStateAction<boolean>>
}

const NewCommentForm = ({ postId, slug, setNewComment, parentId }: CommentFormProps) => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const [storedValues, setStoredValues] = useState<CommentValues | null>(null)

  const { register, handleSubmit, formState: { errors }, } = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
  })

  const { mutate, error } = useMutation({
    mutationFn: (values: CommentValues) =>
      CreateComment({ commentContent: values, postId, slug, parentId }),
      onSuccess: () => {
        setConfirm(false)
        setStoredValues(null)
        setNewComment(false)
      }
    }
  )

  const handlePreConfirmation = (values: CommentValues) => {
    setStoredValues(values)
    setConfirm(true)
  }

  const handleConfirmation = () => {
    storedValues && mutate(storedValues)
  }

  const handleClick = () => {
    setNewComment(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleClick}>
      <form
        onSubmit={handleSubmit(handlePreConfirmation)}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center gap-10 w-full max-w-md p-10 border-2 shadow-lg shadow-blue-300 border-blue-500 rounded-2xl bg-gray-800/90 z-55"
      >
        <textarea
          {...register("content")}
          placeholder="Content..."
          className="border border-blue-500 rounded-md p-2 w-9/10"
        ></textarea>
        {errors.content && <p>{errors.content.message}</p>}

        <div className="flex justify-between w-9/10">
          <button className="button cursor-pointer">Comment</button>
          {error && <p>{error.message}</p>}

          <div className="button cursor-pointer" onClick={handleClick}>
            Cancel
          </div>
        </div>
        <ConfirmChoice handleConfirmation={handleConfirmation} setNewComment={setNewComment} /> 
      </form>
    </div>
  )
}

export default NewCommentForm
