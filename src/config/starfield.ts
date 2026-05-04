/**
 * Cielo real: posición en La Margarita, instante local (Venezuela, UTC−4 sin DST).
 * El 4 abr 2023 a las 12:27 h es de día; usamos la misma noche (22:30) para estrellas visibles.
 */
export const STARFIELD_OBSERVER = {
  /** Porlamar / costa norte aprox. */
  latitudeDeg: 10.978,
  longitudeDeg: -63.848,
  heightMeters: 20,
} as const

/** ISO con offset fijo (no depende del reloj del visitante). */
export const STARFIELD_MOMENT_ISO = '2023-04-04T22:30:00-04:00' as const

export const STARFIELD_LOCATION_LABEL = 'Isla Margarita, Venezuela' as const

export const STARFIELD_HEADLINE = 'Así estaba el cielo cuando empezó todo.' as const

export const STARFIELD_SUBLINE =
  '4 de abril de 2023 · 22:30 (hora Venezuela) · cielo calculado para La Margarita.' as const

/**
 * Va debajo del cielo (SVG), al cierre del bloque. Dejá "" para no mostrar nada.
 */
export const STARFIELD_AFTER_SKY =
  'Ese cielo sigue ahí, arriba de todo. Acá abajo queda lo mismo de siempre: el 4 de abril, y tú.'

/**
 * Línea muy pequeña bajo `STARFIELD_AFTER_SKY` (opcional). "" = oculta.
 */
export const STARFIELD_AFTER_SKY_CAPTION = 'Hecho con cariño · para ti'

/**
 * Altitud mínima (°) para dibujar una estrella. Un poco bajo 6° para incluir Bellatrix en Orión;
 * sigue excluyendo estrellas pegadas al horizonte (p. ej. Rigel, Canopo).
 */
export const STARFIELD_MIN_ALTITUDE_DEG = 5.5

/**
 * Trazos entre estrellas (IDs del catálogo). Solo se pintan si ambas superan la altitud mínima.
 */
export const STARFIELD_LINE_PAIRS: readonly (readonly [string, string])[] = [
  ['acrux', 'mimosa'],
  ['mimosa', 'gacrux'],
  ['gacrux', 'acrux'],
  ['acrux', 'rigilkent'],
  ['rigilkent', 'hadar'],
  ['hadar', 'acrux'],
  ['betelgeuse', 'bellatrix'],
  ['bellatrix', 'mintaka'],
  ['mintaka', 'alnilam'],
  ['alnilam', 'alnitak'],
  ['alnitak', 'saiph'],
  ['procyon', 'sirius'],
  ['sirius', 'betelgeuse'],
  ['pollux', 'castor'],
  ['castor', 'capella'],
  ['capella', 'menkalinan'],
  ['menkalinan', 'alnath'],
  ['alnath', 'betelgeuse'],
  ['spica', 'arcturus'],
  ['arcturus', 'alphecca'],
  ['regulus', 'denebola'],
  ['denebola', 'spica'],
  ['spica', 'alphard'],
  ['alphard', 'procyon'],
  ['avior', 'aspidiske'],
  ['aspidiske', 'miaplacidus'],
  ['miaplacidus', 'suhail'],
  ['mizar', 'alcor'],
]
