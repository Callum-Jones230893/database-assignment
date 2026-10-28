import { z } from "zod"

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "Your password must be a minimum of six characters long."),
})

export const createPostSchema = z.object({
  title: z.string().min(6),
  content: z.string().min(20, "Please have some content."),
  image: z.union([z.instanceof(File), z.array(z.instanceof(File))]).optional(),
})

export const commentSchema = z.object({
  content: z.string().min(20, "You need an actual comment in order to reply."),
  image: z.union([z.instanceof(File), z.array(z.instanceof(File))]).optional(),
})

export const signUpSchema = z.object({
  username: z
    .string()
    .min(6, "Your username must be a minimum of six characters long"),
  email: z.email(),
  password: z
    .string()
    .min(6, "Your password must be a minimum of six characters long."),
})

export const tournamentSignupSchema = z.object({
  name: z.string(),
  classroom: z.string().min(6, "Please enter your course or classroom name.")
})
