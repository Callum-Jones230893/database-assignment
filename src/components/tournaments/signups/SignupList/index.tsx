import { SignupType } from "@/lib/supabase/queries"

type SignupListProps = {
  signups: SignupType | null
}

const SignupList = ({ signups }: SignupListProps) => {
  console.log(signups)
  return (
    <>
      <div className="w-1/3 gap-4 p-5 grid grid-cols-3 grid-auto-rows font-bold mt-10">
        <p className="px-5">Name</p>
        <p className="px-5 text-center">Classroom</p>
        <p className="px-5 text-right">Team name</p>
      </div>
      {signups && signups.length !== 0 ?
        <div className="w-1/3">
          {signups!.map((signup) => 
            <div key={signup.id} className="grid grid-cols-3 grid-auto-rows gap-4 p-5">
              <p className="px-5">{signup.name}</p>
              <p className="px-5 text-center">{signup.classroom}</p>
              <p className="px-5 text-right">{signup.team_name}</p>
            </div>
          )}
        </div>
       : 
        <div>
          <p>No signups yet.</p>
        </div>
      }
    </>
  )
}

export default SignupList
