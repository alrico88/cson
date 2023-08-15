export default defineNuxtConfig({
  app: {
    head: {
      title: "cson - Convert between JSON and CSV",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#dbeafe" },
      ],
      htmlAttrs: {
        "data-bs-theme": "light",
      },
    },
  },
  css: ["@/assets/main.scss"],
  modules: ["nuxt-icon", "@vueuse/nuxt", "@vite-pwa/nuxt"],
  pwa: {
    registerType: "prompt",
    manifest: {
      name: "cson",
      description: "Convert between JSON and CSV formats",
      theme_color: "#dbeafe",
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
  },
});
