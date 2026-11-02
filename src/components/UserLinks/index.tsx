import { createClient } from "@/lib/supabase/serverClient"
import Image from 'next/image'
import Link from "next/link"
import { Logout } from "../../../actions/logout-action"
import create_post from "@/public/images/icons/create_post.png"
import tournaments from "@/public/images/icons/tournaments_page.png"

const UserLinks = async () => {
  const supabase = await createClient()
  const {data:{ user }} = await supabase.auth.getUser()

  return (
    <div className="flex items-center justify-evenly min-w-[1/2] gap-10 mr-5">
      {user
        ? 
          <div className="flex items-center gap-5">
            <div onClick={Logout}><i className="fa-solid fa-arrow-right-from-bracket fa-icon"></i></div>
            <Link href="/createPost"><i className="fa-solid fa-blog fa-icon"></i></Link>
            <Link href="/tournaments"><i className="fa-solid fa-trophy fa-icon"></i></Link>
            <Link href="/createTournament" className="flex items-center h-10 cursor-pointer">Host Tournament</Link>
          </div>
        : 
          <>
            <Link href="/auth/login"><i className="fa-solid fa-right-to-bracket fa-icon"></i></Link>
            <Link href="/auth/signup"><i className="fa-solid fa-user-plus fa-icon"></i></Link>
          </>
      }
    </div>
  )
}

export default UserLinks