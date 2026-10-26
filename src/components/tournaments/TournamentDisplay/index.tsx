"use client"

import { useEffect, useRef } from 'react'
import { Match } from "brackets-model"
import 'brackets-viewer/dist/brackets-viewer.min.css'
import { getBracketsType } from '@/lib/supabase/queries'

type TournamentDisplayProps = {
  data: getBracketsType
}

const TournamentDisplay = ({ data }: TournamentDisplayProps) => {
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !wrapper.current)
      return

    const generateDisplay = async () => {
      try {
        const { tournament } = require("brackets-viewer")
        const tournamentDisplay = new tournament()
        
        tournamentDisplay.render(
          {
            stages: data.stages,
            matches: data.matches,
            matchGames: data.matchGames,
            participants: data.participants
          },
          {
            element: wrapper.current,
            highlightParticipantOnHover: true
          }
        )
      } catch (error) {
        console.error("Error displaying the tournament.", error)
      }
    }
    generateDisplay()
  }, [data])

  return (
    <div className="p-4 bg-zinc-900 rounded-lg overflow-auto">
      <div ref={wrapper} className="brackets-viewer"></div>
    </div>
  )
}

export default TournamentDisplay