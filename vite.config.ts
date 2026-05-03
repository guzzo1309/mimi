import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
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
    server: {
      host: true,
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: false,
        includeAssets: ['heart.svg', 'pwa-192.png', 'pwa-512.png'],
        manifest: {
          name: 'Para el amor de mi vida',
          short_name: 'Nosotros',
          description:
            'Una línea de tiempo de nosotros. Polaroids, razones y el contador desde el 4 de abril.',
          theme_color: '#0c0a09',
          background_color: '#0c0a09',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          lang: 'es',
          icons: [
            {
              src: '/pwa-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          // JPG pueden ser muy pesados; el `<picture>` prioriza WebP en caché.
          globPatterns: ['**/*.{js,css,html,svg,png,webp}'],
        },
      }),
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
