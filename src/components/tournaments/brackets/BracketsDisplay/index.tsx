"use client"

import nextBracket from "@/actions/next-bracket-action"
import { BracketType } from "@/lib/supabase/queries"

type BracketDisplayProps = {
  brackets: BracketType
  slug: string
}

const BracketsDisplay = ({ brackets, slug }: BracketDisplayProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {Object.entries(
        Object.groupBy(brackets, (bracket) => bracket.round_number)).map(([round, matches]) => (
          <div key={round} className="flex flex-col justify-evenly min-w-40 space-y-2">
          {matches?.map((match) => (
            <div key={match.id} className="border border-accent-one p-3 space-y-2">
              <div onClick={() => match.team_name && !match.has_winner && nextBracket({bracketId: match.id, winnerId: match.team_name, slug})}
                className="border border-accent-one p-4 hover:border-button-one">
                {match.team?.team_name ?? "TBD"}
              </div>
              <div onClick={() => match.opponent_id && !match.has_winner && nextBracket({bracketId: match.id, winnerId: match.opponent_id, slug})}
                className="border border-accent-one p-4 hover:border-button-one">
                {match.opponent?.team_name ?? "TBD"}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default BracketsDisplay
