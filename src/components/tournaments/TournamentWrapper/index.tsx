"use client"

import { useState } from "react"
import BracketGenerator from "../BracketGenerator"
import TournamentDisplay from "../TournamentDisplay"
import { getBracketsType } from "@/lib/supabase/queries"

type TournamentWrapperProps = {
  tournamentId: string
  data: getBracketsType
}

const TournamentWrapper = ({ tournamentId, data }: TournamentWrapperProps) => {
  const [creating, setCreating] = useState<boolean>(false)
  const [created, setCreated] = useState<boolean>(false)

  return (
    <div>
      {!created && <BracketGenerator tournamentId={tournamentId} creating={creating} setCreating={setCreating} setCreated={setCreated} />}
      {created && <TournamentDisplay data={data} />}
    </div>
  )
}

export default TournamentWrapper