"use client"

import { Dispatch, SetStateAction } from "react"

type SignupButtonProps = {
  formOpen: boolean
  setFormOpen: Dispatch<SetStateAction<boolean>>
}

const SignupButton = ({ formOpen, setFormOpen }: SignupButtonProps) => {
  const handleClick = () => {
    setFormOpen(!true)
  }

  return (
    <div>
      {!formOpen ?
        <div className="button" onClick={handleClick}>
          <p>Signup here</p>
        </div>
        :
        <div className="button" onClick={handleClick}>
          <p>Cancel</p>
        </div>
      }
    </div>
  )
}

export default SignupButton
