import { supabase } from '@/lib/supabase'

export interface User {
  id: string
  email: string
  name: string | null
  image: string | null
  created_at: string
}

export const userService = {
  async createUser(userData: Omit<User, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 is the error code for no rows returned
    return data
  }
} 