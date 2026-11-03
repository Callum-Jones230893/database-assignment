"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { createTournamentSchema } from "../../../../actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import z from "zod"
import { useState } from "react"
import { HostTournament } from "@/actions/host-tournament-action"
import ConfirmationModal from "@/components/ConfirmationModal"
import { useRouter } from "next/router"

export type TournamentValues = z.infer<typeof createTournamentSchema>

const NewTournament = () => {
  const router = useRouter() 

  const [confirm, setConfirm] = useState<boolean>(false)
  const [storedValues, setStoredValues] = useState<TournamentValues | null>(null)
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [newTournament, setNewTournament] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, } = useForm<TournamentValues>({
    resolver: zodResolver(createTournamentSchema),
  })

  const { mutate, error } = useMutation({
    mutationFn: (values: TournamentValues) => 
      HostTournament(values),
    onSuccess: () => {
      setConfirm(false)
      setStoredValues(null)
      setNewTournament(false)
    },
  })

  const handlePreConfirmation = (values: TournamentValues) => {
    setStoredValues(values)
    setConfirm(true)
    setConfirmOpen(true)
  }

  const handleConfirmation = () => {
    storedValues && mutate(storedValues)
    setConfirmOpen(false)
  }

  const handleClick = () => {
    setNewTournament(false)
    router.push("/tournaments")
  }

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(handlePreConfirmation)}
        onClick={(e) => e.stopPropagation()}
        className="post-form"
      >
        <label htmlFor="title" className="field-header text-center">Tournament title</label>
        <input {...register("title")} placeholder="title..." className="input" />
        {errors.title && <ErrorMessage error={errors.title.message!}/>}
        <div className="flex justify-between w-[90%] md:w-1/2 mx-auto py-10">
          <button><i className="fa-regular fa-circle-check fa-icon"></i></button>
          {error && <p>{error.message}</p>}

          <div onClick={handleClick}><i className="fa-regular fa-circle-xmark fa-icon"></i></div>
        </div>
        {confirmOpen && <ConfirmationModal handleConfirmation={handleConfirmation} setNewChange={setConfirmOpen} />}
      </form>
    </div>
  )
}

export default NewTournament