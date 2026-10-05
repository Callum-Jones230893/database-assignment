"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { signUpSchema } from "./schemas"
import z from "zod"
import { redirect } from "next/navigation"

export const SignUp = async (userdata:z.infer<typeof signUpSchema>) => {
  const supabase = await createClient()
  const {data: {user}, error} = await supabase.auth.signUp(userdata)

  console.log("User from action", user)
  
  if (error) throw error

  if (user && user.email) {
    const {data, error} = await supabase.from("profile")
      .insert({id: user.id, email: user.email, username: userdata.username})
    
    console.log("Our user", data, error)
  } 

  redirect("/")
}