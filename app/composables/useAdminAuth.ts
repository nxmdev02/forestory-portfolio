import type { User } from '@supabase/supabase-js'

const normalizeEmail = (email?: string | null) => email?.trim().toLowerCase() || ''

export const useAdminAuth = () => {
  const config = useRuntimeConfig()
  const { client, isSupabaseConfigured } = useSupabaseClient()
  const user = useState<User | null>('admin-auth-user', () => null)
  const isReady = useState('admin-auth-ready', () => false)
  const authNotice = useState('admin-auth-notice', () => '')
  const adminEmail = computed(() => normalizeEmail(String(config.public.adminEmail || '')))
  const isAllowedAdmin = computed(() => normalizeEmail(user.value?.email) === adminEmail.value)

  const refreshSession = async () => {
    if (!client.value) {
      isReady.value = true
      return
    }

    const { data } = await client.value.auth.getUser()
    user.value = data.user
    isReady.value = true
  }

  const signInWithPassword = async (email: string, password: string) => {
    if (!client.value) throw new Error('Supabase auth is not configured.')
    if (normalizeEmail(email) !== adminEmail.value) throw new Error('This email is not allowed for admin access.')

    const { data, error } = await client.value.auth.signInWithPassword({ email, password })
    if (error) throw error

    user.value = data.user
    if (!isAllowedAdmin.value) {
      await client.value.auth.signOut()
      user.value = null
      throw new Error('This account is not allowed for admin access.')
    }
  }

  const sendMagicLink = async (email: string) => {
    if (!client.value) throw new Error('Supabase auth is not configured.')
    if (normalizeEmail(email) !== adminEmail.value) throw new Error('This email is not allowed for admin access.')

    const { error } = await client.value.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: import.meta.client ? `${window.location.origin}/admin/portfolio` : undefined
      }
    })
    if (error) throw error
  }

  const signOut = async () => {
    if (client.value) await client.value.auth.signOut()
    user.value = null
  }

  if (import.meta.client && !isReady.value) {
    refreshSession()
    client.value?.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
      isReady.value = true
    })
  }

  return {
    adminEmail,
    authNotice,
    isAllowedAdmin,
    isReady,
    isSupabaseConfigured,
    refreshSession,
    sendMagicLink,
    signInWithPassword,
    signOut,
    user
  }
}
