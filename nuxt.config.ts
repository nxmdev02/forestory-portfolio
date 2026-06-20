// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      naverMapClientId: process.env.NUXT_PUBLIC_NAVER_MAP_CLIENT_ID || '',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || '',
      supabaseStorageBucket: process.env.NUXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'portfolio-images'
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ko'
      },
      title: 'WOOD STUDIO | Woodworking Portfolio',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content: 'A woodworking portfolio for custom furniture, solid wood interiors, and handcrafted studio projects.'
        }
      ]
    }
  }
})
