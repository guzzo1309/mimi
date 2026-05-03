import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { HERO_IMAGE_URL } from './src/config/urls'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl =
    env.VITE_SITE_URL || 'https://tu-dominio.vercel.app'
  const base = siteUrl.replace(/\/$/, '')
  const ogImageUrl =
    env.VITE_OG_IMAGE_URL ||
    (HERO_IMAGE_URL.startsWith('http')
      ? HERO_IMAGE_URL
      : `${base}${HERO_IMAGE_URL}`)

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-og-placeholders',
        transformIndexHtml(html) {
          return html
            .replaceAll('__HTML_SITE_URL__', siteUrl)
            .replaceAll('__HTML_OG_IMAGE__', ogImageUrl)
        },
      },
    ],
  }
})
