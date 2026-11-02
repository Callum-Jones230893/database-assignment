"use client"

import { SignupType, TournamentType } from "@/lib/supabase/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"
import { tournamentSignupSchema } from "@/actions/schemas"
import { Dispatch, SetStateAction, useState } from "react"
import { TournamentSignup } from "@/actions/tournament-signup-action"
import ErrorMessage from "@/components/ErrorMessage"
import ConfirmationModal from "@/components/ConfirmationModal"

type SignupFormValues = z.infer<typeof tournamentSignupSchema>

type TournamentSignupProps = {
  tournamentId: string
  tournamentName: string
  setFormOpen: Dispatch<SetStateAction<boolean>>
}

const TournamentSignupForm = ({ tournamentId, tournamentName, setFormOpen }: TournamentSignupProps) => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const [storedValues, setStoredValues] = useState<SignupFormValues | null>(null)
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  
  const { register, handleSubmit, formState: {errors} } = useForm<SignupFormValues>({
    resolver: zodResolver(tournamentSignupSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: TournamentSignup,
  })

  const handlePreConfirmation = (values: SignupFormValues) => {
    setStoredValues(values)
    setConfirm(true)
    setConfirmOpen(true)
  }

  const handleConfirmation = () => {
    if (storedValues) {
      mutate({
        ...storedValues,
        tournamentId,
        tournamentName
      })
    }
    setConfirmOpen(false)
  }

  const handleClick = () => {
    setFormOpen(false)
  }

  return (
    <div className="flex flex-col w-3/4">
      <form
        onSubmit={handleSubmit(handlePreConfirmation)}
        onClick={(e) => e.stopPropagation()}
        className="application-form gap-5"
      >
        <label htmlFor="title" className="field-header">Name</label>
        <input {...register("name")} placeholder="Name..." className="input w-1/2 mx-auto pb-3 md:pb-6 " />
        {errors.name && <ErrorMessage error={errors.name.message!}/>}

        <label htmlFor="image" className="field-header">Class</label>
        <input {...register("classroom")} placeholder="Class..." className="input w-1/2 mx-auto pb-3 md:pb-6" />
        {errors.classroom && <ErrorMessage error={errors.classroom.message!} />}

        <label htmlFor="image" className="field-header">Team Name</label>
        <input {...register("team")} placeholder="Team name..." className="input w-1/2 mx-auto pb-3 md:pb-6" />
        {errors.team && <ErrorMessage error={errors.team.message!} />}

        <div className="flex justify-between w-1/2 md:w-1/4 mx-auto py-10">
          <button><i className="fa-regular fa-circle-check fa-icon"></i></button>
          {error && <p>{error.message}</p>}

          <button><i className="fa-regular fa-circle-check fa-icon"></i></button>
        </div>
        {confirmOpen && <ConfirmationModal handleConfirmation={handleConfirmation} setNewChange={setConfirmOpen} />}
      </form>
    </div>
  )
}

export default TournamentSignupForm