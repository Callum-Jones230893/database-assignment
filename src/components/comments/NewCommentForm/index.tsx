"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { commentSchema } from "@/actions/schemas"
import z from "zod"
import { CreateComment } from "@/actions/comment-action"
import { Dispatch, SetStateAction, useState } from "react"
import ConfirmationModal from "@/components/ConfirmationModal"

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
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

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
    setConfirmOpen(true)
  }

  const handleConfirmation = () => {
    storedValues && mutate(storedValues)
    setConfirmOpen(false)
  }

  const handleClick = () => {
    setNewComment(false)
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={handleClick}>
      <form
        onSubmit={handleSubmit(handlePreConfirmation)}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center gap-10 w-full max-w-md p-10 border-2 border-accent-one bg-[#1d201b] z-55"
      >
        <textarea
          {...register("content")}
          placeholder="Content..."
          className="border border-accent-one rounded-md p-2 w-[90%]"
        ></textarea>
        {errors.content && <p>{errors.content.message}</p>}

        <div className="flex justify-between w-[90%]">
          <button className="button cursor-pointer">Comment</button>
          {error && <p>{error.message}</p>}

          <div className="button cursor-pointer" onClick={handleClick}>
            Cancel
          </div>
        </div>
        {confirmOpen && <ConfirmationModal handleConfirmation={handleConfirmation} setNewChange={setNewComment} />}
      </form>
    </div>
  )
}

export default NewCommentForm
