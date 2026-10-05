export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applicants: {
        Row: {
          created_at: string
          deleted: boolean
          deleted_at: string
          experience: boolean | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          deleted_at: string
          experience?: boolean | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean
          deleted_at?: string
          experience?: boolean | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      brackets: {
        Row: {
          bracket_number: number
          created_at: string
          game_number: number
          id: string
          loser: string | null
          player_one: string | null
          player_two: string | null
          time_slot: string
          winner: string | null
        }
        Insert: {
          bracket_number: number
          created_at?: string
          game_number: number
          id?: string
          loser?: string | null
          player_one?: string | null
          player_two?: string | null
          time_slot?: string
          winner?: string | null
        }
        Update: {
          bracket_number?: number
          created_at?: string
          game_number?: number
          id?: string
          loser?: string | null
          player_one?: string | null
          player_two?: string | null
          time_slot?: string
          winner?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brackets_player_one_fkey"
            columns: ["player_one"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brackets_player_one_fkey1"
            columns: ["player_one"]
            isOneToOne: false
            referencedRelation: "applicants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brackets_player_two_fkey"
            columns: ["player_two"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          commenter: string | null
          content: string
          created_at: string
          deleted: boolean
          deleted_at: string | null
          id: string
          parent_id: string | null
          post_id: string | null
          title: string | null
        }
        Insert: {
          commenter?: string | null
          content: string
          created_at?: string
          deleted?: boolean
          deleted_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
          title?: string | null
        }
        Update: {
          commenter?: string | null
          content?: string
          created_at?: string
          deleted?: boolean
          deleted_at?: string | null
          id?: string
          parent_id?: string | null
          post_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_commenter_fkey"
            columns: ["commenter"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          author: string
          category: string | null
          content: string | null
          created_at: string
          deleted: boolean
          deleted_at: string | null
          id: string
          image: string | null
          slug: string
          title: string
        }
        Insert: {
          author: string
          category?: string | null
          content?: string | null
          created_at?: string
          deleted?: boolean
          deleted_at?: string | null
          id?: string
          image?: string | null
          slug: string
          title: string
        }
        Update: {
          author?: string
          category?: string | null
          content?: string | null
          created_at?: string
          deleted?: boolean
          deleted_at?: string | null
          id?: string
          image?: string | null
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          deleted: boolean
          deleted_at: string | null
          email: string
          experience: boolean | null
          id: string
          role: string
          username: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          deleted_at?: string | null
          email: string
          experience?: boolean | null
          id?: string
          role?: string
          username: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          deleted_at?: string | null
          email?: string
          experience?: boolean | null
          id?: string
          role?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
