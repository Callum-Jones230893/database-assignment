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
import { redirect } from "next/navigation"

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
    redirect("/tournaments")
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

        <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between mx-auto w-1/2">
          <div className="flex flex-col items-center justify-center w-1/2 gap-2">
            <label htmlFor="start" className="field-header">Start date</label>
            <input {...register("start")} placeholder="Start date..." className="border border-accent-one rounded-sm p-2" />
            {errors.title && <ErrorMessage error={errors.title.message!}/>}
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 gap-2">
            <label htmlFor="end" className="field-header">End date</label>
            <input {...register("end")} placeholder="End date..." className="border border-accent-one rounded-sm p-2" />
            {errors.title && <ErrorMessage error={errors.title.message!}/>}
          </div>
        </div>

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