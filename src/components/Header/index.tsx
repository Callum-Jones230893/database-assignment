import Link from "next/link"
import UserLinks from "../UserLinks"
import SearchBar from "../SearchBar"

const Header = () => {
  return (
    <header className="flex items-center gap-20 p-5 justify-between border-b-4 border-blue-500">
      <div className="flex flex-col">
        <Link href="/" className="button hover:scale-110 duration-75">
          <h1 className="text-2xl">Tournament</h1>
          <h2 className="text-xl">Generator</h2>
        </Link>
      </div>
      <SearchBar />
      <UserLinks />
    </header>
  )
}

export default Header