"use client"

import { SignupType, TournamentType } from "@/lib/supabase/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"
import { tournamentSignupSchema } from "@/actions/schemas"
import { useState } from "react"
import { TournamentSignup } from "@/actions/tournament-signup-action"
import ErrorMessage from "@/components/ErrorMessage"
import ConfirmationModal from "@/components/ConfirmationModal"

type SignupFormValues = z.infer<typeof tournamentSignupSchema>

type TournamentSignupProps = {
  tournamentId: string
  tournamentName: string
}

const TournamentSignupForm = ({ tournamentId, tournamentName }: TournamentSignupProps) => {
  const [signup, setSignup] = useState<boolean>(false)
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
    setSignup(false)
  }

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(handlePreConfirmation)}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center gap-10 w-full max-w-md p-10 border-2 border-accent-one bg-[#1d201b] z-55"
      >
        <label htmlFor="title">Name</label>
        <input {...register("name")} placeholder="Name..." className="input" />
        {errors.name && <ErrorMessage error={errors.name.message!}/>}

        <label htmlFor="image">Class</label>
        <input {...register("classroom")} placeholder="Class..." className="input" />
        {errors.classroom && <ErrorMessage error={errors.classroom.message!} />}

        <button className="button cursor-pointer">Submit</button>
        {error && <p>{error.message}</p>}

        <div className="flex justify-between w-9/10">
          <button className="button cursor-pointer">Comment</button>
          {error && <p>{error.message}</p>}

          <div className="button cursor-pointer" onClick={handleClick}>
            Cancel
          </div>
        </div>
        {confirmOpen && <ConfirmationModal handleConfirmation={handleConfirmation} setNewComment={setSignup} />}
      </form>
    </div>
  )
}

export default TournamentSignupForm