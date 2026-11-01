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

const SignupWrapper = ({ tournament, signups }: SignupWrapperProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false)

  return (
    <div className="min-w-1/4">
    {tournament && 
      <div className="flex flex-col grow gap-5 items-center my-5">
        <SignupButton formOpen={formOpen} setFormOpen={setFormOpen} />
        {formOpen && <SignupForm tournamentId={tournament.id} tournamentName={tournament.tournament_name} setFormOpen={setFormOpen} />}
        <SignupList signups={signups} />
      </div>}
    </div>
  )
}

export default SignupWrapper