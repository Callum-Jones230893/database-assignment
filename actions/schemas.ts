import { z } from "zod"

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Your password must be a minimum of six characters long."),
})

export const createPostSchema = z.object({
  title: z.string().min(6, "Please enter a valid title of atleast six characters."),
  content: z.string().min(20, "Please enter a comment containing atleast 20 characters."),
  image: z.union([z.instanceof(File), z.array(z.instanceof(File))]).optional(),
})

export const createTournamentSchema = z.object({
  title: z.string().min(6, "Please enter a valid title of atleast six characters."),
})

export const commentSchema = z.object({
  content: z.string().min(6, "Please enter a comment of atleast six characters.")
})

export const signUpSchema = z.object({
  username: z.string().min(6, "Your username must be a minimum of six characters long"),
  email: z.email(),
  password: z.string().min(6, "Your password must be a minimum of six characters long."),
})

export const tournamentSignupSchema = z.object({
  name: z.string(),
  classroom: z.string().min(6, "Please enter your course or classroom name."),
  team: z.string()
})
