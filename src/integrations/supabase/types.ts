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
      alerts: {
        Row: {
          id: string
          robot_id: string | null
          status: string
          timestamp: string | null
          type: string
        }
        Insert: {
          id?: string
          robot_id?: string | null
          status: string
          timestamp?: string | null
          type: string
        }
        Update: {
          id?: string
          robot_id?: string | null
          status?: string
          timestamp?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_robot_id_fkey"
            columns: ["robot_id"]
            isOneToOne: false
            referencedRelation: "robots"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          id: string
          timestamp: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          id?: string
          timestamp?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          id?: string
          timestamp?: string | null
        }
        Relationships: []
      }
      missions: {
        Row: {
          assigned_robot_id: string | null
          description: string | null
          end_time: string | null
          id: string
          name: string
          start_time: string | null
          status: string
        }
        Insert: {
          assigned_robot_id?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          name: string
          start_time?: string | null
          status: string
        }
        Update: {
          assigned_robot_id?: string | null
          description?: string | null
          end_time?: string | null
          id?: string
          name?: string
          start_time?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "missions_assigned_robot_id_fkey"
            columns: ["assigned_robot_id"]
            isOneToOne: false
            referencedRelation: "robots"
            referencedColumns: ["id"]
          },
        ]
      }
      robots: {
        Row: {
          battery_level: number
          cpu_usage: number | null
          height: number | null
          id: string
          location: unknown | null
          name: string
          ram_usage: number | null
          speed: number | null
          status: string
          temperature: number | null
        }
        Insert: {
          battery_level: number
          cpu_usage?: number | null
          height?: number | null
          id?: string
          location?: unknown | null
          name: string
          ram_usage?: number | null
          speed?: number | null
          status: string
          temperature?: number | null
        }
        Update: {
          battery_level?: number
          cpu_usage?: number | null
          height?: number | null
          id?: string
          location?: unknown | null
          name?: string
          ram_usage?: number | null
          speed?: number | null
          status?: string
          temperature?: number | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_robot_id: string | null
          description: string | null
          id: string
          mission_id: string | null
          name: string
          status: string
        }
        Insert: {
          assigned_robot_id?: string | null
          description?: string | null
          id?: string
          mission_id?: string | null
          name: string
          status: string
        }
        Update: {
          assigned_robot_id?: string | null
          description?: string | null
          id?: string
          mission_id?: string | null
          name?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_robot_id_fkey"
            columns: ["assigned_robot_id"]
            isOneToOne: false
            referencedRelation: "robots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
