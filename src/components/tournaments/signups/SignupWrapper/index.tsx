"use client"

import { SignupType, TournamentType } from "@/lib/supabase/queries"
import SignupList from "../SignupList"
import SignupForm from "../SignupForm"
import { useState } from "react"
import SignupButton from "../SignupButton"

type SignupWrapperProps = {
  tournament: TournamentType
  signups: SignupType | null
}

const SignupWrapper = async ({ tournament, signups }: SignupWrapperProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false)

  return (
    <div className="flex flex-col items-center">
    {tournament && 
      <div className="flex flex-col grow w-4/5">
        <div>
          <h2 className="subtitle">{tournament.tournament_name}</h2>
          <h3>{tournament.created_by.username}</h3>
        </div>
        <SignupButton formOpen={formOpen} setFormOpen={setFormOpen} />
        <SignupList signups={signups} />
        <SignupForm tournamentId={tournament.id} tournamentName={tournament.tournament_name} />
      </div>}
    </div>
  )
}

export default SignupWrapper