export default defineNuxtConfig({
  app: {
    head: {
      title: "cson - Convert between JSON and CSV",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#f8fcee" },
        {
          name: "google-site-verification",
          content: "nc0pKffQdhm679g_eXEQhjK-NzBM8ZbyFQLR9ZMeJtc",
        },
      ],
      htmlAttrs: {
        "data-bs-theme": "light",
        lang: "en",
      },
    },
  },
  css: ["@/assets/main.scss"],
  modules: [
    "nuxt-icon",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "nuxt-simple-sitemap",
    "@nuxtjs/google-fonts",
  ],
  pwa: {
    registerType: "prompt",
    manifest: {
      name: "cson",
      description: "Convert between JSON and CSV formats",
      theme_color: "#f8fcee",
      icons: [
        {
          src: "pwa-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      cleanupOutdatedCaches: true,
    },
  },
  routeRules: {
    "/": {
      static: true,
    },
    "/json-to-csv": {
      static: true,
    },
    "/csv-to-json": {
      static: true,
    },
  },
  experimental: {
    payloadExtraction: true,
    headNext: true,
  },
  googleFonts: {
    families: {
      "Source Sans Pro": [400, 600, 800],
      Pacifico: [400],
    },
  },
  site: {
    url: "https://cson.vercel.app",
  },
});
