"use client"

import { TournamentType, SignupType } from "@/lib/supabase/queries"
import BracketDisplayWrapper from "../brackets/BracketsDisplayWrapper"
import SignupWrapper from "../signups/SignupWrapper"
import { useState } from "react"
import { DeleteTournament } from "@/actions/delete-tournament-action"
import DeleteButton from "@/components/DeleteButton"

type TournamentWrapperProps = {
  tournament: TournamentType
  signups: SignupType | null
  isCreator: boolean
}

const TournamentWrapper = ({ tournament, signups, isCreator }: TournamentWrapperProps) => {
  const [generating, setGenerating] = useState<boolean>(false)

  return (
    <div className="flex flex-col w-4/5 gap-6 mx-auto mb-10">
      <div className="full-tournament-card">
        <h2 className="subtitle">{tournament.tournament_name}</h2>
        <h3>Hosted by: {tournament.created_by.username}</h3>
        {isCreator && 
          <div className="flex gap-2 items-center justify-center">
            <DeleteButton
              id={tournament.id}
              mutateFn={DeleteTournament}
              successMessage="Tournament deleted"
            />
          </div>
        }
      </div>
      {tournament.generated === false && <SignupWrapper tournament={tournament} signups={signups} />}
      <BracketDisplayWrapper
        tournament={tournament}
        isCreator={isCreator}
        generating={generating}
        setGenerating={setGenerating}
      />
    </div>
  )
}

export default TournamentWrapper
