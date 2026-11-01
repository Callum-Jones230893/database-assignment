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

export type TournamentValues = z.infer<typeof createTournamentSchema>

const NewTournament = () => {
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
  }

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(handlePreConfirmation)}
        onClick={(e) => e.stopPropagation()}
        className="post-form"
      >
        <label htmlFor="title" className="field-header">Tournament title</label>
        <input {...register("title")} placeholder="title..." className="input w-1/2 mx-auto pb-3 md:pb-6" />
        {errors.title && <ErrorMessage error={errors.title.message!}/>}

        <div className="flex justify-between w-1/2 mx-auto py-10">
          <button className="button cursor-pointer">Submit</button>
          {error && <p>{error.message}</p>}

          <div className="button cursor-pointer" onClick={handleClick}>
            Cancel
          </div>
        </div>
        {confirmOpen && <ConfirmationModal handleConfirmation={handleConfirmation} setNewChange={setNewTournament} />}
      </form>
    </div>
  )
}

export default NewTournament