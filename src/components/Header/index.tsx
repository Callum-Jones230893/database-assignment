import UserLinks from "../UserLinks"
import SearchBar from "../SearchBar"
import { Link } from "@/components/ui/link"
import { Heading } from "@/components/ui/heading"
import { HeaderBox } from "@/components/ui/headerBox/index.web"
import { Box } from "@/components/ui/box/index.web"

const Header = () => {
  return (
    <Box type="header-box">
      <div className="flex">
        <Link href="/" className="button hover:scale-110 duration-75">
          <Heading className="text-2xl">Tournament</Heading>
          <Heading className="text-xl">Generator</Heading>
        </Link>
      </div>
      <div className="flex items-center">
        <SearchBar />
      </div>
      <UserLinks />
    </Box>
  )
}

export default Header