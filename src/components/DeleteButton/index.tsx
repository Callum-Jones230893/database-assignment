"use client"

import { useMutation } from "@tanstack/react-query"
import router from "next/router"
import { toast } from "sonner"

type DeleteButtonProps = {
  id: string
  mutateFn: (id: string) => Promise<unknown>
  successMessage?: string
}

const DeleteButton = ({ id, mutateFn, successMessage = "Successfully deleted" }: DeleteButtonProps) => {

  const { mutate } = useMutation({
    mutationFn: mutateFn,
    onSuccess: () => {
      toast.success(successMessage)
      router.push("/")
    },
    onError: () => toast.error("Error, please try again."),
  })

  return (
    <button onClick={() => mutate(id)} >
      <i className="fa-solid fa-trash fa-icon" />
    </button>
  )
}

export default DeleteButton