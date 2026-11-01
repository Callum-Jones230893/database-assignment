"use client"

import { getHostedTournaments, HostedTournamentsType } from "@/lib/supabase/queries"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/browserClient"
import Link from "next/link"

type PostedTournamentsListProps = {
  tournaments: HostedTournamentsType
}

const PostedTournamentsList = ({ tournaments }: PostedTournamentsListProps) => {
  const supabase = createClient()
  const { data } = useQuery({
    queryKey: ["tournaments", tournaments],
    queryFn: async () => {
      const { data, error } = await getHostedTournaments(supabase)
      if (error) throw new Error()

      return data
    },
    initialData: tournaments,
    staleTime: 1000,
  })

  return (
    <div className="flex-col w-8/10 mb-10">
      <h2 className="subtitle">Upcoming Tournaments</h2>
      {data &&
        tournaments.map((tournament) => (
          <Link
            href={`/tournaments/${tournament.slug}`}
            key={tournament.id}
            className="border-2 border-accent-one p-4 flex mb-3 min-h-30 items-center hover:bg-[#1d201b]"
          >
            <div className="bg-accent-two w-1 min-h-30 mr-4"></div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <h3 className="font-bold text-[20px] md:text-2xl">{tournament.tournament_name}</h3>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default PostedTournamentsList