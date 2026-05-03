import { intervalToDuration } from 'date-fns'
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
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/10 px-0.5 py-2.5 sm:rounded-2xl sm:bg-white/5 sm:px-2 sm:py-4 md:px-3">
      <span className="font-mono text-[clamp(0.95rem,4.8vw,1.75rem)] font-semibold tabular-nums leading-none text-white sm:text-2xl md:text-3xl">
        {value}
      </span>
      <span className="mt-1 max-w-full text-center text-[8px] font-medium uppercase leading-tight tracking-tight text-stone-400 sm:text-[10px] sm:tracking-wider md:text-xs">
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
        <div className="text-center">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Llevamos exactamente…
          </h2>
          <p className="mt-2 px-1 text-sm text-balance text-stone-500">
            Desde {relationshipStartLabel()}
          </p>
        </div>

        <div className="mx-auto mt-10 flex w-full max-w-4xl flex-nowrap items-stretch justify-center gap-1 sm:gap-2.5 md:gap-3">
          <Unit label="Años" value={parts.years} />
          <Unit label="Meses" value={parts.months} />
          <Unit label="Días" value={parts.days} />
          <Unit label="Horas" value={parts.hours} />
          <Unit label="Min" value={parts.minutes} />
          <Unit label="Seg" value={parts.seconds} />
        </div>

        <p className="mt-10 px-2 text-center font-display text-sm text-balance italic text-stone-500">
          Cada segundo desde ese 4 de abril a las 12:27. Gracias por este tiempo.
        </p>
      </div>
    </footer>
  )
}
