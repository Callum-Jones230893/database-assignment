"use client"

import { SignupType, TournamentType } from "@/lib/supabase/queries"
import generateTournament from "@/lib/utils/bracketLogic"
import { Dispatch, SetStateAction } from "react"
import TournamentDisplay from "../TournamentDisplay"

type BracketDisplayWrapperProps = {
  tournament: TournamentType
  signups: SignupType | null
  isCreator: boolean
  isGenerated: boolean
  setIsGenerated: Dispatch<SetStateAction<boolean>>
  generating: boolean
  setGenerating: Dispatch<SetStateAction<boolean>>
}

const BracketDisplayWrapper = ({ tournament, signups, isCreator, isGenerated, setIsGenerated, generating, setGenerating }: BracketDisplayWrapperProps) => {
  let tournamentId = tournament?.id

  const handlePopulation = async () => {
    setGenerating(true)

    try {
      await generateTournament(tournamentId as string)
      setIsGenerated(true)
    } catch (error) {
      console.log("Error genertating brackets", error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      {isCreator && 
        <div
          onClick={handlePopulation}
          className="w-full py-2 px-4 rounded font-medium text-black"
        >
          {generating ? "Generating..." : "Generate Tournament"}
        </div>
      }
      {isGenerated &&
        <TournamentDisplay />
      }
    </div>
  )
}

export default BracketDisplayWrapper