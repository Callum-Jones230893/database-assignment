import { getSignupType } from "@/lib/supabase/queries"

type SignupListProps = {
  signups: getSignupType | null
}

const SignupList = ({ signups }: SignupListProps) => {
  return (
    <div>
      {signups!.map((signup) => 
        <li>
          <ul>
            {signup.name}
          </ul>
        </li>
      )}
    </div>
  )
}

export default SignupList