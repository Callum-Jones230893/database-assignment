import { SignupType } from "@/lib/supabase/queries"

type SignupListProps = {
  signups: SignupType | null
}

const SignupList = ({ signups }: SignupListProps) => {
  return (
    <div>
      {signups!.map((signup) => 
        <div>
          <p>{signup.name}</p>
        </div>
      )}
    </div>
  )
}

export default SignupList