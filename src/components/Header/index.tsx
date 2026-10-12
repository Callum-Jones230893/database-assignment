import UserLinks from "../UserLinks"
import SearchBar from "../SearchBar"
import Link from "next/link"

const Header = () => {
  return (
    <header className="flex items-center gap-20 p-5 justify-between border-b-4 border-orange-500 mb-20">
      <Link href="/" className="hover:scale-110 duration-75">
        <h1 className="text-2xl">Tournament</h1>
        <h2 className="text-xl">Generator</h2>
      </Link>
      <SearchBar />
      <UserLinks />
    </header>
  )
}

export default Header