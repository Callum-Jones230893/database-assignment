import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"
import { Logout } from "../../../actions/logout-action"

const UserLinks = async () => {
  const supabase = await createClient()
  const {data:{user}, error} = await supabase.auth.getUser()

  return (
    <div className="flex justify-evenly min-w-[1/2] gap-10">
      {user
        ? <>
            <div onClick={Logout} className="flex items-center button-secondary h-10">Logout</div>
            <Link href="/createPost" className="flex items-center button-secondary h-10">Create post</Link>
          </>
        : 
          <>
            <Link href="/auth/login" className="flex items-center button-secondary h-10">Login</Link>
            <Link href="/auth/signup" className="flex items-center button-secondary h-10">Signup</Link>
          </>
      }
    </div>
  )
}

export default UserLinks