import { createClient } from "./browserClient"
import { type QueryData } from "@supabase/supabase-js"

export type LandingPostType = QueryData<ReturnType<typeof getLandingPosts>>

export const getLandingPosts = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("post")
    .select(`id, title, slug, author("id", "username")`)
    .order("created_at", { ascending: false })
}

export type HostedTournamentsType = QueryData<ReturnType<typeof getHostedTournaments>>

export const getHostedTournaments = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("tournament")
    .select(`id, tournament_name, slug, created_by("id", "username")`)
    .order("created_at", { ascending: false })
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
  const search = searchTerm.trim().split(/\s+/).join(' & ')

  const supabase = createClient()
  return await supabase
    .from("post")
    .select(`title, slug`)
    .textSearch(`title`, `${search}`)
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
    .select(`id, tournament_name, slug, generated, created_by("id", "username")`)
    .eq(`slug`, slug)
    .single()
}

export type BracketType = QueryData<ReturnType<typeof getBrackets>>

export const getBrackets = async (tournamentId: string) => {
  const supabase = await createClient()
  return supabase
    .from("brackets")
    .select(`
      *,
      team:signups!brackets_team_name_fkey(team_name),
      opponent:signups!brackets_opponent_id_fkey(team_name)
    `)
    .eq("tournament_id", tournamentId)
}

export type SignupType = QueryData<ReturnType<typeof getSignups>>

export const getSignups = async (tournamentId: string) => {
  const supabase = await createClient()
  return supabase
    .from("signups")
    .select(`id, name, tournament_id("id", "tournament_name"), user_id("id", "username", "experience", "classroom"), team_name, classroom`)
    .eq("tournament_id", tournamentId)
}

export type ProfileType = QueryData<ReturnType<typeof getProfile>>

export const getProfile = async (username: string) => {
  const supabase = await createClient()
  return supabase
    .from("profile")
    .select("*")
    .eq("username", username )
    .single()
}