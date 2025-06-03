export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_actions: {
        Row: {
          action: string
          details: string | null
          id: string
          status: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          details?: string | null
          id?: string
          status?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          details?: string | null
          id?: string
          status?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_actions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          created_at: string | null
          created_by: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          amount: number
          client_id: string
          contract_number: string
          created_at: string | null
          created_by: string
          end_date: string
          id: string
          start_date: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          client_id: string
          contract_number: string
          created_at?: string | null
          created_by: string
          end_date: string
          id?: string
          start_date: string
          status: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          client_id?: string
          contract_number?: string
          created_at?: string | null
          created_by?: string
          end_date?: string
          id?: string
          start_date?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      contrats: {
        Row: {
          created_at: string | null
          date_debut: string
          date_fin: string
          documents: string[] | null
          franchise: number | null
          id: string
          numero_contrat: string
          prime_annuelle: number
          statut: string | null
          type_contrat: string | null
          updated_at: string | null
          user_id: string | null
          vehicule_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_debut: string
          date_fin: string
          documents?: string[] | null
          franchise?: number | null
          id?: string
          numero_contrat: string
          prime_annuelle: number
          statut?: string | null
          type_contrat?: string | null
          updated_at?: string | null
          user_id?: string | null
          vehicule_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_debut?: string
          date_fin?: string
          documents?: string[] | null
          franchise?: number | null
          id?: string
          numero_contrat?: string
          prime_annuelle?: number
          statut?: string | null
          type_contrat?: string | null
          updated_at?: string | null
          user_id?: string | null
          vehicule_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contrats_vehicule_id_fkey"
            columns: ["vehicule_id"]
            isOneToOne: false
            referencedRelation: "vehicules"
            referencedColumns: ["id"]
          },
        ]
      }
      paiements: {
        Row: {
          contrat_id: string | null
          created_at: string | null
          date_paiement: string
          id: string
          methode: string | null
          montant: number
          preuve: string | null
          reference: string
          statut: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          contrat_id?: string | null
          created_at?: string | null
          date_paiement: string
          id?: string
          methode?: string | null
          montant: number
          preuve?: string | null
          reference: string
          statut?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          contrat_id?: string | null
          created_at?: string | null
          date_paiement?: string
          id?: string
          methode?: string | null
          montant?: number
          preuve?: string | null
          reference?: string
          statut?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paiements_contrat_id_fkey"
            columns: ["contrat_id"]
            isOneToOne: false
            referencedRelation: "contrats"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          permissions: string[] | null
          phone: string
          role: string | null
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          permissions?: string[] | null
          phone: string
          role?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          permissions?: string[] | null
          phone?: string
          role?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_backup: {
        Row: {
          address: Json | null
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          permission_id: number
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          permission_id: number
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          permission_id?: number
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      sinistres: {
        Row: {
          contrat_id: string | null
          created_at: string | null
          date_sinistre: string
          date_traitement: string | null
          degats: string
          description: string
          id: string
          lieu: string
          montant_dommages: number | null
          photos: string[] | null
          reference: string
          statut: string | null
          temoins: Json | null
          updated_at: string | null
          user_id: string | null
          vehicule_id: string | null
        }
        Insert: {
          contrat_id?: string | null
          created_at?: string | null
          date_sinistre: string
          date_traitement?: string | null
          degats: string
          description: string
          id?: string
          lieu: string
          montant_dommages?: number | null
          photos?: string[] | null
          reference: string
          statut?: string | null
          temoins?: Json | null
          updated_at?: string | null
          user_id?: string | null
          vehicule_id?: string | null
        }
        Update: {
          contrat_id?: string | null
          created_at?: string | null
          date_sinistre?: string
          date_traitement?: string | null
          degats?: string
          description?: string
          id?: string
          lieu?: string
          montant_dommages?: number | null
          photos?: string[] | null
          reference?: string
          statut?: string | null
          temoins?: Json | null
          updated_at?: string | null
          user_id?: string | null
          vehicule_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sinistres_contrat_id_fkey"
            columns: ["contrat_id"]
            isOneToOne: false
            referencedRelation: "contrats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sinistres_vehicule_id_fkey"
            columns: ["vehicule_id"]
            isOneToOne: false
            referencedRelation: "vehicules"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicules: {
        Row: {
          annee: number
          carte_grise: string | null
          created_at: string | null
          date_mise_circulation: string | null
          id: string
          immatriculation: string
          marque: string
          modele: string
          puissance: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          annee: number
          carte_grise?: string | null
          created_at?: string | null
          date_mise_circulation?: string | null
          id?: string
          immatriculation: string
          marque: string
          modele: string
          puissance?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          annee?: number
          carte_grise?: string | null
          created_at?: string | null
          date_mise_circulation?: string | null
          id?: string
          immatriculation?: string
          marque?: string
          modele?: string
          puissance?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      vignettes: {
        Row: {
          contrat_id: string | null
          created_at: string | null
          date_debut: string
          date_fin: string
          id: string
          numero: string
          pdf_url: string | null
          qr_code: string | null
          updated_at: string | null
          user_id: string | null
          vehicule_id: string | null
        }
        Insert: {
          contrat_id?: string | null
          created_at?: string | null
          date_debut: string
          date_fin: string
          id?: string
          numero: string
          pdf_url?: string | null
          qr_code?: string | null
          updated_at?: string | null
          user_id?: string | null
          vehicule_id?: string | null
        }
        Update: {
          contrat_id?: string | null
          created_at?: string | null
          date_debut?: string
          date_fin?: string
          id?: string
          numero?: string
          pdf_url?: string | null
          qr_code?: string | null
          updated_at?: string | null
          user_id?: string | null
          vehicule_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vignettes_contrat_id_fkey"
            columns: ["contrat_id"]
            isOneToOne: false
            referencedRelation: "contrats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vignettes_vehicule_id_fkey"
            columns: ["vehicule_id"]
            isOneToOne: false
            referencedRelation: "vehicules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      admin_users: {
        Row: {
          id: string | null
        }
        Insert: {
          id?: string | null
        }
        Update: {
          id?: string | null
        }
        Relationships: []
      }
      secure_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          permissions: string[] | null
          role: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          permissions?: string[] | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          permissions?: string[] | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      delete_all_tables_data: {
        Args: { tables_to_clean: string[] }
        Returns: undefined
      }
      delete_tables_data: {
        Args: { table_names: string[] }
        Returns: undefined
      }
      disable_referential_integrity: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      disable_triggers: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      drop_policy_if_exists: {
        Args: { policy_name: string; table_name: string; schema_name?: string }
        Returns: undefined
      }
      enable_referential_integrity: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      enable_triggers: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_profiles_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_user_permissions: {
        Args: { user_id: string }
        Returns: {
          permission: string
        }[]
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      hard_reset_database: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      reset_database: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      reset_database_safe: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      reset_sequences: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      update_user_phone: {
        Args: { user_id: string; phone_number: string }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "admin" | "agent" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "agent", "user"],
    },
  },
} as const
