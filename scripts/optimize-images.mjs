/**
 * Genera WebP en 640px y 1280px de ancho para cada JPG en public/fotos/.
 * Uso: bun run images:webp
 */
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fotosDir = path.join(__dirname, '../public/fotos')

const isJpg = (name) => /\.jpe?g$/i.test(name) && !/-(640|1280)\.webp$/i.test(name)

async function main() {
  let files
  try {
    files = await readdir(fotosDir)
  } catch {
    console.warn('No existe public/fotos — nada que optimizar.')
    process.exit(0)
  }

  const jpgFiles = files.filter(isJpg)
  if (jpgFiles.length === 0) {
    console.log('No hay JPG en public/fotos.')
    process.exit(0)
  }

  for (const name of jpgFiles) {
    const input = path.join(fotosDir, name)
    const base = name.replace(/\.[^.]+$/i, '')
    const out640 = path.join(fotosDir, `${base}-640.webp`)
    const out1280 = path.join(fotosDir, `${base}-1280.webp`)

    const meta = await sharp(input).metadata()
    const w = meta.width ?? 1280

    await sharp(input)
      .resize(640, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 82, effort: 4 })
      .toFile(out640)

    await sharp(input)
      .resize(Math.min(1280, w), null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 82, effort: 4 })
      .toFile(out1280)

    console.log('OK', name, '→', path.basename(out640), path.basename(out1280))
  }

  const root = path.join(__dirname, '../public')
  await sharp(path.join(root, 'heart.svg'))
    .resize(192, 192)
    .png()
    .toFile(path.join(root, 'pwa-192.png'))

  await sharp(path.join(root, 'heart.svg'))
    .resize(512, 512)
    .png()
    .toFile(path.join(root, 'pwa-512.png'))

  console.log('OK PWA icons pwa-192.png pwa-512.png')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
