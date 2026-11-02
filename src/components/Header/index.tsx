import UserLinks from "../UserLinks"
import SearchBar from "../SearchBar"
import Link from "next/link"
import Image from "next/image"

const Header = () => {
  return (
    <header className="flex items-center gap-20 p-5 justify-between border-b-4 border-accent-one mb-20">
      <Link href="/" className="hover:scale-110 duration-75">

      </Link>
      <SearchBar />
      <UserLinks />
    </header>
  )
}

export default Header