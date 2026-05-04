import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { KISS_COUNTER_HINT, KISS_COUNTER_TITLE } from '../config/site'

const STORAGE_KEY = 'mimi-kiss-count'

function readStoredCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw == null) return 0
    const n = Number.parseInt(raw, 10)
    return Number.isFinite(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}

function sillyFootnote(n: number): string | null {
  if (n === 404) return '404: amor encontrado.'
  if (n === 1000) return 'Mil. Esto ya es un monumento.'
  if (n === 9001) return 'Es más de 9000. No podía dejar pasar el chiste.'
  if (n > 0 && n % 10_000 === 0) return 'Otro nivel de números absurdos desbloqueado.'
  return null
}

export function KissCounter() {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(() =>
    typeof window === 'undefined' ? 0 : readStoredCount(),
  )

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        /* private mode / quota */
      }
      return next
    })
  }, [])

  const display = count.toLocaleString('es')
  const foot = sillyFootnote(count)

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/4 px-5 py-6 text-center shadow-inner sm:mt-12 sm:rounded-3xl sm:px-6 sm:py-7">
      <h3 className="font-display text-lg font-semibold text-white sm:text-xl">{KISS_COUNTER_TITLE}</h3>
      <p className="mx-auto mt-2 max-w-sm text-pretty text-xs leading-relaxed text-stone-500 sm:text-sm">
        {KISS_COUNTER_HINT}
      </p>

      <div className="mt-6 flex items-center justify-center gap-5 sm:gap-6">
        <p className="font-mono text-[clamp(2rem,10vw,3rem)] font-semibold tabular-nums leading-none text-rose-100">
          {display}
        </p>
        <motion.button
          type="button"
          onClick={increment}
          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-rose-300/35 bg-rose-500/20 text-2xl font-light text-rose-50 shadow-lg transition-colors hover:bg-rose-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/70 active:bg-rose-500/25"
          aria-label="Sumar un beso al contador"
        >
          +
        </motion.button>
      </div>

      {foot ? (
        <p className="mt-4 font-display text-sm italic text-rose-200/90 sm:text-base">{foot}</p>
      ) : null}
    </div>
  )
}
