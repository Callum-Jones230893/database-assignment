"use client"

import { getBrackets, TournamentType } from "@/lib/supabase/queries"
import generateTournament from "@/actions/generate-tournament-action"
import { Dispatch, SetStateAction } from "react"
import BracketsDisplay from "../BracketsDisplay"
import { useQuery } from "@tanstack/react-query"
import { setGenerated } from "@/actions/set-generated-action"

type BracketDisplayWrapperProps = {
  tournament: TournamentType
  isCreator: boolean
  generating: boolean
  setGenerating: Dispatch<SetStateAction<boolean>>
}

const BracketsDisplayWrapper = ({ tournament, isCreator, generating, setGenerating }: BracketDisplayWrapperProps) => {
  const tournamentId = tournament?.id
  const slug = tournament.slug!

  const { data: brackets, refetch } = useQuery({
    queryKey: ["brackets", tournament.id],
    queryFn: async () => {
      const { data, error } = await getBrackets(tournamentId)
      if (error) throw new Error()
      return data
    }
  })

  const isGenerated = brackets && brackets.length > 0 && tournament.generated === true

  const handlePopulation = async () => {
    setGenerating(true)
    try {
      await generateTournament({tournamentId, slug})
      await setGenerated(tournamentId, slug)

      await refetch()
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
          {isCreator &&  !isGenerated &&
            <div onClick={handlePopulation} className="w-full py-2 px-4 text-2xl text-center">
              {generating ? <p>Generating...</p> : <p className="cursor-pointer hover:scale-110">Generate</p>}
            </div>
          }
          {isGenerated && <BracketsDisplay brackets={brackets} slug={`/tournaments/${slug}`} />}
        </div>
      }
    </>
  )
}

export default BracketsDisplayWrapper