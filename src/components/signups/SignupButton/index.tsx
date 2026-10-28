"use client"

import { useState } from "react"

const SignupButton = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false)

  return (
    <div className="button">
      <p>Signup here</p>
    </div>
  )
}

export default SignupButton