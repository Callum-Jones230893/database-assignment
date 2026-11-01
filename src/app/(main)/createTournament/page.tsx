import NewTournament from "@/components/tournaments/NewTournament"

const HostTournamentPage = async () => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="subtitle">Host a tournament</h2>
      <NewTournament />
    </div>
  )
}

export default HostTournamentPage