import { defineConfig } from "astro/config"
import vue from "@astrojs/vue"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  site: "https://kelvinlamptey.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [vue(), sitemap()],
})
