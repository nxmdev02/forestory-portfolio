import { createClient } from '@supabase/supabase-js'

export const useSupabaseClient = () => {
  const config = useRuntimeConfig()
  const isSupabaseConfigured = computed(() => Boolean(config.public.supabaseUrl && config.public.supabaseAnonKey))
  const client = computed(() => {
    if (!isSupabaseConfigured.value) return null

    return createClient(
      String(config.public.supabaseUrl),
      String(config.public.supabaseAnonKey)
    )
  })

  return {
    client,
    isSupabaseConfigured
  }
}
