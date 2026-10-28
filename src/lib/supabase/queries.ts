import { Match } from "brackets-model"
import { createClient } from "./browserClient"
import { type QueryData } from "@supabase/supabase-js"

export type LandingPostType = QueryData<ReturnType<typeof getLandingPosts>>

export const getLandingPosts = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("post")
    .select(`id, title, slug, author("id", "username")`)
}

export type FullPostType = QueryData<ReturnType<typeof getFullPost>>

export const getFullPost = async (slug: string) => {
  const supabase = createClient()
  return await supabase
    .from("post")
    .select(`id, title, content, image, author("id", "username")`)
    .eq(`slug`, slug)
    .single()
}

export type SearchPostType = QueryData<ReturnType<typeof searchPosts>>

export const searchPosts = async (searchTerm: string) => {
  const supabase = createClient()
  return await supabase
    .from("post")
    .select(`title, slug`)
    .textSearch(`title`, searchTerm)
}

export type CommentType = QueryData<ReturnType<typeof getComment>>

export const getComment = async (postId: string) => {
  const supabase = await createClient()
  return supabase
    .from("comments")
    .select(`id, parent_id, content, created_at, commenter("id", "username")`)
    .eq("post_id", postId)
    .order("created_at", { ascending: false })
}

export type TournamentType = QueryData<ReturnType<typeof getTournament>>

export const getTournament = async (slug: string) => {
  const supabase = await createClient()
  return supabase
    .from("tournament")
    .select(`id, tournament_name, created_by("id", "username")`)
    .eq(`slug`, slug)
    .single()
}

// export type getBracketsType = QueryData<ReturnType<typeof getBrackets>>

// export const getBrackets = async (tournamentId: string ) => {
//   const supabase = await createClient()
//   return supabase
//     .from("brackets")
//     .select(
//       `id, bracket_number, game_number,
//        time_slot, player_one("id", "user_name", "applicant_name"),
//        player_two("id", "user_name", "applicant_name"),
//        winner, loser, tournament_id("id")`
//       )
//     .eq("tournament_id", tournamentId)
// }

export type getApplicantType = QueryData<ReturnType<typeof getApplicants>>

export const getApplicants = async ( applicantId: string ) => {
  const supabase = await createClient()
  return supabase
    .from("applicants")
    .select("id, name, experience, classroom")
    .eq("id", applicantId)
}

export type getSignupType = QueryData<ReturnType<typeof getSignups>>

export const getSignups = async ( signupName: string ) => {
  const supabase = await createClient()
  return supabase
    .from("signups")
    .select(`id, name, tournament_id("id", "tournament_name"), user_name("id", "username", "experience", "classroom"), applicant_name("id", "name", "experience", "classroom"), classroom`)
    .eq("name", signupName)
}

export type getProfileType = QueryData<ReturnType<typeof getProfile>>

export const getProfile = async ( username: string ) => {
  const supabase = await createClient()
  return supabase
    .from("profile")
    .select("*")
    .eq("username", username )
    .single()
}