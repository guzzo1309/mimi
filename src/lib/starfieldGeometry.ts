const D2R = Math.PI / 180

/**
 * Proyección del hemisferio visible sobre un disco: cenit arriba, horizonte hacia los bordes.
 * Azimut: 0° norte, creciendo hacia el este (convención habitual).
 */
export function altAzToStarfieldXy(azimuthDeg: number, altitudeDeg: number): { x: number; y: number } {
  const alt = altitudeDeg * D2R
  const az = azimuthDeg * D2R
  const xi = Math.cos(alt) * Math.sin(az)
  const eta = Math.cos(alt) * Math.cos(az)
  const scale = 44
  return { x: 50 + scale * xi, y: 50 - scale * eta }
}

export function starRadiusPx(mag: number): number {
  const t = Math.max(0, Math.min(1, (3.4 - mag) / 4.4))
  return 0.48 + t * 1.45
}

export function starOpacity(mag: number): number {
  return Math.max(0.35, Math.min(1, 1.1 - mag * 0.1))
}
