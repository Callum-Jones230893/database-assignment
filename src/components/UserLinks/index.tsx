import { createClient } from "@/lib/supabase/serverClient"
import Image from 'next/image'
import Link from "next/link"
import { Logout } from "../../../actions/logout-action"
import createPostIcon from "@/public/images/icons/create_post.png"
import loginIcon from "@/public/images/icons/login.png"
import logoutIcon from "@/public/images/icons/logout.png"
import tournamentsIcon from "@/public/images/icons/view_tournaments.png"
import createTournamentIcon from "@/public/images/icons/create_tournament.png"
import signupIcon from "@/public/images/icons/sign_up.png"


const UserLinks = async () => {
  const supabase = await createClient()
  const {data:{ user }} = await supabase.auth.getUser()

  return (
    <div className="flex items-center justify-evenly gap-10 mr-5">
      {user
        ? 
          <div className="flex items-center gap-2 md:gap-5">
            <div onClick={Logout}>
              <Image src={logoutIcon} alt="Logout" height={100} width={100} className="icons"/>
            </div>
            <Link href="/createPost">
              <Image src={createPostIcon} alt="Create a post" height={100} width={100} className="icons"/>
            </Link>
            <Link href="/tournaments">
              <Image src={tournamentsIcon} alt="View tournaments" height={100} width={100} className="icons"/>
            </Link>
            <Link href="/createTournament">
              <Image src={createTournamentIcon} alt="Create a tournament" height={100} width={100} className="icons"/>
            </Link>
          </div>
        : 
          <>
            <Link href="/auth/login">
              <Image src={loginIcon} alt="Login" height={100} width={100} className="icons"/>
            </Link>
            <Link href="/auth/signup">
              <Image src={signupIcon} alt="Signup" height={100} width={100} className="icons"/>
            </Link>
          </>
      }
    </div>
  )
}

export default UserLinks