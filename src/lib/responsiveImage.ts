/**
 * Rutas WebP generadas por `bun run images:webp` (mismo nombre base + `-640.webp` / `-1280.webp`).
 * Si aún no existen, el navegador usa el JPG del `<img>`.
 */
export function responsiveSources(fallbackPath: string) {
  const base = fallbackPath.replace(/\.[^.]+$/i, '')
  return {
    fallback: fallbackPath,
    webp640: `${base}-640.webp`,
    webp1280: `${base}-1280.webp`,
  }
}

/** URLs para precargar en el boot (WebP + fallback). */
export function preloadUrlsForImage(fallbackPath: string): string[] {
  const s = responsiveSources(fallbackPath)
  return [s.webp640, s.webp1280, s.fallback]
}

export const SIZES_POLAROID =
  '(max-width: 640px) 92vw, (max-width: 1024px) 45vw, min(33vw, 420px)'

export const SIZES_HERO = '100vw'
