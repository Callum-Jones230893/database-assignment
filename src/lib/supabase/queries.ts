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
    .select(`id, title, content, author("id", "username")`)
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

export const getComment = async () => {
  const supabase = createClient()
  return await supabase
    .from("comments")
    .select(`id, content, commenter("username")`)
    .single()
}
