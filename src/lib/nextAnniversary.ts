import { differenceInCalendarDays } from 'date-fns'

const APRIL = 3
const DAY = 4
const HOUR = 12
const MINUTE = 27

/** Próximo 4 de abril a las 12:27 (hora local) estrictamente después de `reference`. */
export function nextAnniversaryAt1227(reference: Date): Date {
  const y = reference.getFullYear()
  let next = new Date(y, APRIL, DAY, HOUR, MINUTE, 0)
  if (next.getTime() <= reference.getTime()) {
    next = new Date(y + 1, APRIL, DAY, HOUR, MINUTE, 0)
  }
  return next
}

/** Días de calendario hasta ese 4 de abril (0 = hoy es 4 de abril). */
export function calendarDaysUntilAnniversary(now: Date): number {
  const next = nextAnniversaryAt1227(now)
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startEvent = new Date(next.getFullYear(), next.getMonth(), next.getDate())
  return differenceInCalendarDays(startEvent, startToday)
}
