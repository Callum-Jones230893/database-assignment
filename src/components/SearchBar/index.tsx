"use client"

import { searchPosts, SearchPostType } from "@/lib/supabase/queries"
import Link from "next/link"
import { SetStateAction, useState } from "react"

const SearchBar = () => {
  const [search, setSearch] = useState<string>("")
  const [searchResults, setSearchResults] = useState<SearchPostType | null>(
    null,
  )

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value)
  }

  const handleClick = async () => {
    const { data, error } = await searchPosts(search)
    if (error) throw new Error()
    setSearchResults(data)
  }

  return (
    <div className="relative">
      <div className="flex w-[10%] items-center">
        <div className="border border-pacifika">
          <input
            placeholder="Search posts"
            value={search}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClick} className="cursor-pointer">
          Submit
        </button>
      </div>
      {searchResults && (
        <div className="absolute left-0 top-full">
          {searchResults.map((result, index) => (
            <Link className="block" key={index} href={`/${result.slug}`}>
              {result.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
