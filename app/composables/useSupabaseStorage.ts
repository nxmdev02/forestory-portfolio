const createSafeFileName = (file: File) => {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const safeBase = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${Date.now()}-${crypto.randomUUID()}-${safeBase || 'portfolio'}.${extension}`
}

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

export const useSupabaseStorage = () => {
  const config = useRuntimeConfig()
  const { client, isSupabaseConfigured: isSupabaseClientConfigured } = useSupabaseClient()
  const isSupabaseConfigured = computed(() =>
    Boolean(isSupabaseClientConfigured.value && config.public.supabaseStorageBucket)
  )

  const uploadPortfolioImage = async (file: File) => {
    if (!isSupabaseConfigured.value) {
      return {
        url: await readFileAsDataUrl(file),
        storage: 'local' as const
      }
    }

    const supabase = client.value
    if (!supabase) throw new Error('Supabase is not configured.')

    const bucket = String(config.public.supabaseStorageBucket)
    const path = `portfolio/${new Date().getFullYear()}/${createSafeFileName(file)}`
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '31536000',
      upsert: false
    })

    if (error) throw error

    const { data } = supabase.storage.from(bucket).getPublicUrl(path)

    return {
      url: data.publicUrl,
      storage: 'supabase' as const
    }
  }

  return {
    isSupabaseConfigured,
    uploadPortfolioImage
  }
}
