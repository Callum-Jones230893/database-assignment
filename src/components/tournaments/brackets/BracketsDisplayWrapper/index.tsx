"use client"

import { getBrackets, TournamentType } from "@/lib/supabase/queries"
import generateTournament from "@/actions/generate-tournament-action"
import { Dispatch, SetStateAction } from "react"
import BracketsDisplay from "../BracketsDisplay"
import { useQuery } from "@tanstack/react-query"
import { setGenerated } from "@/actions/set-generated-action"
import { createClient } from "@/lib/supabase/browserClient"

type BracketDisplayWrapperProps = {
  tournament: TournamentType
  isCreator: boolean
  generating: boolean
  setGenerating: Dispatch<SetStateAction<boolean>>
}

const BracketsDisplayWrapper = ({ tournament, isCreator, generating, setGenerating }: BracketDisplayWrapperProps) => {
  const tournamentId = tournament?.id
  const slug = tournament.slug!

  const { data: tournamentData, refetch: refetchTournament } = useQuery({
    queryKey: ["tournament", tournamentId],
    initialData: tournament,
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("tournament")
        .select(`
          id,
          tournament_name,
          slug,
          generated,
          created_by (
            id,
            username
          )
        `)
        .eq("id", tournamentId)
        .single()

      if (error) throw error

      return data as TournamentType
    }
  })

  const { data: brackets, refetch: refetchBrackets } = useQuery({
    queryKey: ["brackets", tournament.id],
    queryFn: async () => {
      const { data, error } = await getBrackets(tournamentId)
      
      if (error) throw new Error()

      return data
    }
  })

  const isGenerated = brackets && brackets.length > 0 && tournamentData.generated === true

  const handlePopulation = async () => {
    setGenerating(true)
    try {
      await generateTournament({tournamentId, slug})
      await setGenerated(tournamentId, slug)

       await Promise.all([
        refetchBrackets(),
        refetchTournament()
      ])
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