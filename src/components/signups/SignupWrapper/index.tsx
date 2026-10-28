import { getApplicantType, getSignupType } from "@/lib/supabase/queries"
import { User } from "@supabase/auth-js"
import SignupList from "../SignupList"
import SignupForm from "../SignupForm"

type SignupWrapperProps = {
  applicants: getApplicantType | null
  signups: getSignupType | null
  user: User | null
}

const SignupWrapper = ({ applicants, signups, user }: SignupWrapperProps) => {
  return (
    <div>
      {/* <SignupButton /> */}
      <SignupList signups={signups} />
      <SignupForm applicants={applicants} user={user} signups={signups} />
    </div>
  )
}

export default SignupWrapper