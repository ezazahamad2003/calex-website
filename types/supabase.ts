export interface Database {
  public: {
    Tables: {
      waitlist_entries: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          firm: string | null
          role: 'founder' | 'lawyer'
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          firm?: string | null
          role: 'founder' | 'lawyer'
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          firm?: string | null
          role?: 'founder' | 'lawyer'
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
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
  }
}

// Legacy interface for compatibility with existing code
export interface WaitlistEntry {
  id: string
  name: string
  email: string
  company?: string
  firm?: string
  role: "founder" | "lawyer"
  timestamp: string
  ip?: string
  userAgent?: string
}

export interface WaitlistStats {
  total: number
  founders: number
  lawyers: number
  lastUpdated: string
}
