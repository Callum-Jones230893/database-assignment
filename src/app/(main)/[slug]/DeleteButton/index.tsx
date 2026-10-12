"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { DeletePost } from "../../../../../actions/delete-post-action"

const DeleteButton = ({ id }: {id: string}) => {
  const { mutate } = useMutation({
    mutationFn: DeletePost,
    onSettled: () => toast("Post has been deleted"),
  })

  return (
   <button onClick={() => mutate(id)} className="button cursor-pointer">Delete post</button>
  )
}

export default DeleteButton