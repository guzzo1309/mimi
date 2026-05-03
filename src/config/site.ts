/**
 * Fotos: `public/fotos/`. Rutas = nombre exacto (en servidores Linux importan mayúsculas).
 * Las HEIC del iPhone se sirven como .jpg generados (Chrome no muestra HEIC en <img>).
 */

import { HERO_IMAGE_URL } from './urls'

export { HERO_IMAGE_URL }

/**
 * Día en que empezaron: 4 de abril de 2023, 12:27 (hora local del navegador).
 * El contador y el hero se calculan a partir de esto.
 */
export const RELATIONSHIP_START = new Date(2023, 3, 4, 12, 27, 0)

/** Texto legible del inicio (footer, etc.). */
export function relationshipStartLabel(): string {
  const fecha = RELATIONSHIP_START.toLocaleDateString('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const hora = RELATIONSHIP_START.toLocaleTimeString('es', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `el ${fecha}, ${hora}`
}

/** URL de un MP3 significativo (opcional). Si está vacío, no se muestra el botón Play. */
export const MUSIC_URL = import.meta.env.VITE_MUSIC_URL ?? ''

/** Mensaje del easter egg (triple tap en el monograma ♡). */
export const EASTER_EGG_MESSAGE =
  'El 4 de abril a las 12:27 no fue un error: fue la mejor versión que subí a producción. 💜'

export type Polaroid = {
  id: string
  src: string
  alt: string
  reason: string
}

/** Todas las fotos en `public/fotos/`. Las que eran HEIC usan la versión .jpg. */
export const POLAROIDS: Polaroid[] = [
  {
    id: 'p1',
    src: '/fotos/F7656699-FB31-455B-9526-B2A45CD9CCB6.JPG',
    alt: 'Nosotros, un día cualquiera que fue enorme',
    reason:
      'Porque en esta foto me volviste a enseñar que lo cotidiano contigo es imposible de dar por sentado.',
  },
  {
    id: 'p2',
    src: '/fotos/IMG_0950.JPG',
    alt: 'Esa risa que me arregla el día',
    reason:
      'Porque cuando te ríes el tiempo afloja un segundo y yo lo guardo en el bolsillo.',
  },
  {
    id: 'p3',
    src: '/fotos/IMG_0994.jpg',
    alt: 'Un recuerdo que guardo en el cuerpo',
    reason:
      'Porque algunos momentos no se explican: se sienten, y este es uno.',
  },
  {
    id: 'p4',
    src: '/fotos/IMG_1263.jpg',
    alt: 'Otro instante nuestro',
    reason:
      'Porque mirar esta foto es volver a un lugar donde todo estaba bien.',
  },
  {
    id: 'p5',
    src: '/fotos/IMG_1272.jpg',
    alt: 'Tú y yo, sin apuro',
    reason:
      'Porque cuando estamos juntos el reloj se vuelve generoso.',
  },
  {
    id: 'p6',
    src: '/fotos/IMG_1352.JPG',
    alt: 'Risas que no se pueden explicar con palabras',
    reason:
      'Porque te ríes antes de que termine el chiste y me pierdo en ti otra vez.',
  },
  {
    id: 'p7',
    src: '/fotos/IMG_2781.jpg',
    alt: 'Un café, un viaje, un nosotros',
    reason:
      'Porque compartir el silencio o el alboroto contigo nunca se siente en vano.',
  },
  {
    id: 'p8',
    src: '/fotos/IMG_3006.jpg',
    alt: 'Algo que celebrar',
    reason:
      'Porque celebras mis victorias pequeñas como si el mundo entero estuviera mirando.',
  },
  {
    id: 'p9',
    src: '/fotos/IMG_5176.JPG',
    alt: 'La ciudad y tú',
    reason:
      'Porque cualquier mapa sirve si la mano que tomo es la tuya.',
  },
  {
    id: 'p10',
    src: '/fotos/IMG_7072_Original.JPG',
    alt: 'Noche nuestra',
    reason:
      'Porque la noche contigo no es oscuridad: es descanso con nombre propio.',
  },
  {
    id: 'p11',
    src: '/fotos/IMG_7075_Original.JPG',
    alt: 'Aire libre, tú y yo',
    reason:
      'Porque cuando estamos afuera el ruido baja y lo único que queda claro eres tú.',
  },
]

export const CAROUSEL_PHRASES: string[] = [
  'Cada 4 de abril el calendario me recuerda lo mismo: que volvería a decir que sí mil veces.',
  'Te amo porque en los días de mucho código, tú eres el único bug que no quiero corregir.',
  'Porque “nos vemos” nunca alcanza y “ya llegué” contigo es la mejor notificación del mundo.',
  'Porque guardas mis caos con ternura, como quien guarda algo que no se rompe.',
  'Porque el plan B contigo le gana al plan A con cualquier otra versión de la vida.',
  'Porque el hogar no es un lugar: es tu voz cuando vuelvo hecho pedazos y me dices: aquí estoy.',
]
