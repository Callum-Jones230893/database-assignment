"use client"

import { TournamentType, SignupType } from "@/lib/supabase/queries"
import BracketDisplayWrapper from "../brackets/BracketDisplayWrapper"
import SignupWrapper from "../signups/SignupWrapper"
import { useState } from "react"

type TournamentWrapperProps = {
  tournament: TournamentType
  signups: SignupType | null
  isCreator: boolean
}

const TournamentWrapper = ({ tournament, signups, isCreator }: TournamentWrapperProps) => {
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [generating, setGenerating] = useState<boolean>(false)

  return (
    <div>
      <div>
        <h2 className="subtitle">{tournament.tournament_name}</h2>
        <h3>{tournament.created_by.username}</h3>
      </div>
      {!isGenerated && <SignupWrapper tournament={tournament} signups={signups} />}
      {isGenerated && 
        <BracketDisplayWrapper
          tournament={tournament}
          signups={signups}
          isCreator={isCreator}
          isGenerated={isGenerated}
          setIsGenerated={setIsGenerated}
          generating={generating}
          setGenerating={setGenerating}
        />}
    </div>
  )
}

export default TournamentWrapper
