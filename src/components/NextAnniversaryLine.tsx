import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { calendarDaysUntilAnniversary, nextAnniversaryAt1227 } from '../lib/nextAnniversary'

function formatAnniversaryLong(d: Date): string {
  const raw = d.toLocaleDateString('es', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

function daysLabel(n: number): string {
  if (n <= 0) return 'Hoy es nuestro 4 de abril en el calendario.'
  if (n === 1) return 'Falta 1 día.'
  return `Faltan ${n.toLocaleString('es')} días.`
}

export function NextAnniversaryLine() {
  const reduceMotion = useReducedMotion()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const next = nextAnniversaryAt1227(now)
  const daysLeft = calendarDaysUntilAnniversary(now)
  const longDate = formatAnniversaryLong(next)

  const initial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <section className="relative border-t border-white/5 bg-linear-to-b from-stone-950 to-stone-950 py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(244,63,94,0.06),transparent_50%)]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-xl rounded-2xl border border-rose-200/15 bg-rose-950/25 px-4 py-5 text-center sm:px-6 sm:py-6"
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={transition}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-rose-200/70">
            Próximo hito
          </p>
          <p className="mt-2 font-display text-lg font-medium leading-snug text-rose-50 sm:text-xl">
            {longDate}
          </p>
          <p className="mt-2 text-sm text-rose-100/85 sm:text-base">{daysLabel(daysLeft)}</p>
          <p className="mt-3 text-xs leading-relaxed text-stone-400 sm:text-sm">
            Mismo mes, mismo día, misma hora: el aniversario que volvería a firmar mil veces.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
