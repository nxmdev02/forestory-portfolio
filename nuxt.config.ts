// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      naverMapClientId: process.env.NUXT_PUBLIC_NAVER_MAP_CLIENT_ID || ''
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
          name: 'description',
          content: 'A woodworking portfolio for custom furniture, solid wood interiors, and handcrafted studio projects.'
        }
      ]
    }
  }
})
