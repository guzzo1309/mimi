/** Rotación estable por id (evita saltos entre renders). */
export function rotationForId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i += 1) {
    h = (h << 5) - h + id.charCodeAt(i)
    h |= 0
  }
  const n = Math.abs(h) % 11
  return n - 5
}
