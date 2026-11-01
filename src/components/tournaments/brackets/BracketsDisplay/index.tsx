"use client"

import { BracketType } from "@/lib/supabase/queries"

type BracketDisplayProps = {
  brackets: BracketType
}

const BracketsDisplay = ({ brackets }: BracketDisplayProps) => {
  return (
    <div className="flex gap-8 overflow-x-auto p-4">
      {Object.entries(
        Object.groupBy(brackets, (bracket) => bracket.round_number)).map(([round, matches]) => (
        <div key={round} className="min-w-30 space-y-4">
          <h2 className="font-bold text-lg">Round {round}</h2>
          {matches?.map((match) => (
            <div key={match.id} className="border border-accent-one p-3 space-y-2"
            >
              <div className="border-b pb-2">{match.team_name ?? "TBD"}</div>
              <div>{match.opponent_id ?? "TBD"}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default BracketsDisplay
