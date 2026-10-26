"use client"

import { Dispatch, SetStateAction, useState } from "react"
import generateTournament from "@/lib/utils/bracketLogic"

type BracketGeneratorProps = {
  tournamentId: string
  creating: boolean
  setCreating: Dispatch<SetStateAction<boolean>>
  setCreated: Dispatch<SetStateAction<boolean>>
}

const BracketGenerator = ({ tournamentId, creating, setCreating, setCreated }: BracketGeneratorProps) => {
  const handlePopulation = async () => {
    setCreating(true)

    try {
      await generateTournament(tournamentId)
      setCreated(true)
    } catch (error) {
      console.log("Error generating brackets", error)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div>
      <h2 className="">
        Tournament Generator
      </h2>
      <button
        onClick={handlePopulation}
        className="w-full py-2 px-4 rounded font-medium text-black"
      >
        {creating ? "Populating..." : "Populate Tournament"}
      </button>
    </div>
  )
}

export default BracketGenerator
