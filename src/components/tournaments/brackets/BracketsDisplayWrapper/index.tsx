"use client"

import { getBrackets, TournamentType } from "@/lib/supabase/queries"
import generateTournament from "@/actions/generate-tournament-action"
import { Dispatch, SetStateAction } from "react"
import BracketsDisplay from "../BracketsDisplay"
import { useQuery } from "@tanstack/react-query"

type BracketDisplayWrapperProps = {
  tournament: TournamentType
  isCreator: boolean
  isGenerated: boolean
  setIsGenerated: Dispatch<SetStateAction<boolean>>
  generating: boolean
  setGenerating: Dispatch<SetStateAction<boolean>>
}

const BracketsDisplayWrapper = ({ tournament, isCreator, isGenerated, setIsGenerated, generating, setGenerating }: BracketDisplayWrapperProps) => {
  const tournamentId = tournament?.id

  const { data: brackets } = useQuery({
    queryKey: ["brackets", tournament.id],
    queryFn: async () => {
      const { data, error } = await getBrackets(tournament.id)
      if (error) throw new Error()

      return data
    }
  })

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
    <>
      {brackets && 
        <div>
          {isCreator && 
            <div
              onClick={handlePopulation}
              className="w-full py-2 px-4 rounded font-medium text-black"
            >
              {generating ? <p>"Generating..."</p> : <p>"Generate Tournament"</p>}
            </div>
          }
          {isGenerated ? <BracketsDisplay brackets={brackets} /> : <p>Not generated yet, please wait.</p>}
        </div>
      }
    </>
  )
}

export default BracketsDisplayWrapper