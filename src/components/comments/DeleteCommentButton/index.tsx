"use client"

import { DeleteComment } from "@/actions/delete-comment-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

type DeleteComentButtonProps = {
  id: string
  slug: string
}

const DeleteCommentButton = ({ id, slug }: DeleteComentButtonProps) => {
  const { mutate } = useMutation({
    mutationFn: DeleteComment,
    onSettled: () => toast("Post has been deleted"),
  })

  return (
    <button onClick={() => mutate(id)} className="button cursor-pointer">
      Delete comment
    </button>
  )
}

export default DeleteCommentButton
