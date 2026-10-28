import { getApplicantType, getSignupType } from "@/lib/supabase/queries"
import { User } from "@supabase/auth-js"

type SignupFormProps = {
  applicants: getApplicantType | null
  user: User | null
  signups: getSignupType | null
}

const SignupForm = ({ applicants, user, signups }: SignupFormProps) => {
  return (
    <div>
    </div>
  )
}

export default SignupForm