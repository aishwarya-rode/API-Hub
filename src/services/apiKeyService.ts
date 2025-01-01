import { supabase } from '@/lib/supabase'

export interface ApiKey {
  id: string
  name: string
  key: string
  status: 'active' | 'inactive'
  created_at: string
  monthly_limit?: number | null
}

export const apiKeyService = {
  async fetchApiKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createApiKey(newKey: { name: string; key: string; status: string; monthly_limit: number | null }) {
    const { data, error } = await supabase
      .from('api_keys')
      .insert([newKey])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteApiKey(id: string) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async updateKeyStatus(id: string, status: 'active' | 'inactive') {
    const { error } = await supabase
      .from('api_keys')
      .update({ status })
      .eq('id', id)

    if (error) throw error
  },

  async updateKeyName(id: string, name: string) {
    const { error } = await supabase
      .from('api_keys')
      .update({ name })
      .eq('id', id)

    if (error) throw error
  }
} 