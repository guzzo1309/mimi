import { intervalToDuration } from 'date-fns'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { RELATIONSHIP_START, relationshipStartLabel } from '../config/site'

type DurationParts = {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function computeParts(now: Date): DurationParts {
  const d = intervalToDuration({ start: RELATIONSHIP_START, end: now })
  return {
    years: d.years ?? 0,
    months: d.months ?? 0,
    days: d.days ?? 0,
    hours: d.hours ?? 0,
    minutes: d.minutes ?? 0,
    seconds: d.seconds ?? 0,
  }
}

function Unit({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-md sm:min-w-[5.5rem] sm:px-4">
      <span className="font-mono text-2xl font-semibold tabular-nums text-white sm:text-3xl">
        {value}
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-stone-400 sm:text-xs">
        {label}
      </span>
    </div>
  )
}

export function TogetherCounter() {
  const [parts, setParts] = useState<DurationParts>(() => computeParts(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(computeParts(new Date()))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <footer className="relative bg-linear-to-b from-stone-950 to-black pb-16 pt-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Llevamos exactamente…
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            Desde {relationshipStartLabel()}
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Unit label="Años" value={parts.years} />
          <Unit label="Meses" value={parts.months} />
          <Unit label="Días" value={parts.days} />
          <Unit label="Horas" value={parts.hours} />
          <Unit label="Min" value={parts.minutes} />
          <Unit label="Seg" value={parts.seconds} />
        </motion.div>

        <p className="mt-10 text-center font-display text-sm italic text-stone-500">
          Cada segundo desde ese 4 de abril a las 12:27. Gracias por este tiempo.
        </p>
      </div>
    </footer>
  )
}
