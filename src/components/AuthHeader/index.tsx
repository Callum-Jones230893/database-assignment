import Link from "next/link"
import Image from "next/image"
import logo from "@/public/images/tournament_logo_top_right_shield_ribbon.png"

const AuthHeader = () => {
  return (
    <header className="sticky top-0 bg-accent-one/20 backdrop-blur-md">
      <div className="flex items-center gap-20 p-5 justify-between border-b-4 border-accent-one mb-20">
        <Link href="/" className="inline-flex h-20 items-center hover:scale-110 transition duration-75">
          <Image src={logo} alt="Website logo" width={100} height={100} className="object-contain p-2" />
        </Link>
      </div>
    </header>
  )
}

export default AuthHeader
