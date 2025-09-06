import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  department: string
  avatar?: string
  phone?: string
  location?: string
  bio?: string
  joinDate: string
}

export interface AuthResponse {
  user: User | null
  error: string | null
}

export const authService = {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { user: null, error: error.message }
      }

      if (data.user) {
        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          return { user: null, error: 'Failed to fetch user profile' }
        }

        return { user: profile, error: null }
      }

      return { user: null, error: 'Authentication failed' }
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' }
    }
  },

  async signUp(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    department: string
  }): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      })

      if (error) {
        return { user: null, error: error.message }
      }

      if (data.user) {
        // Create user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: userData.email,
              firstName: userData.firstName,
              lastName: userData.lastName,
              role: userData.role,
              department: userData.department,
              joinDate: new Date().toISOString(),
            },
          ])
          .select()
          .single()

        if (profileError) {
          return { user: null, error: 'Failed to create user profile' }
        }

        return { user: profile, error: null }
      }

      return { user: null, error: 'Registration failed' }
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' }
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return null

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      return profile
    } catch (error) {
      return null
    }
  }
}