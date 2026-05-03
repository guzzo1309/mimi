import { differenceInCalendarDays, intervalToDuration } from 'date-fns'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HERO_IMAGE_URL, MUSIC_URL, RELATIONSHIP_START } from '../config/site'

function heroHeadlines(now: Date) {
  const days = Math.max(0, differenceInCalendarDays(now, RELATIONSHIP_START))
  const { years } = intervalToDuration({ start: RELATIONSHIP_START, end: now })
  const y = years ?? 0
  const daysStr = days.toLocaleString('es')
  return {
    yearsLine: `${y} ${y === 1 ? 'Año' : 'Años'}.`,
    daysLine: `${daysStr} ${days === 1 ? 'Día' : 'Días'}.`,
  }
}

export function Hero() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const { yearsLine, daysLine } = heroHeadlines(now)

  const toggleAudio = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      el.pause()
      setPlaying(false)
    }
  }, [])

  const showMusic = Boolean(MUSIC_URL)

  return (
    <section className="relative isolate flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden">
      {/* Una sola capa de imagen (antes eran dos: menos decode y menos blur en GPU) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 scale-[1.04] transform-gpu bg-cover bg-center blur-[3px] brightness-[0.52]"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/40 via-black/25 to-black/55" />

      <motion.div
        className="relative z-10 max-w-4xl px-4 text-center sm:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="font-display text-[clamp(1.65rem,7.5vw,2.25rem)] font-semibold leading-[1.15] tracking-tight text-white text-balance drop-shadow-lg sm:text-5xl sm:leading-tight md:text-6xl md:leading-[1.08]">
          <span className="block">{yearsLine}</span>
          <span className="mt-2 block text-white/95">{daysLine}</span>
          <span className="mt-3 block bg-linear-to-r from-rose-100 via-white to-amber-100 bg-clip-text font-medium text-transparent">
            Infinitas razones.
          </span>
        </p>
        <p className="mx-auto mt-6 max-w-md text-pretty text-sm font-medium text-white/75 sm:mt-8 sm:text-base md:motion-safe:animate-pulse">
          Empezó todo un 4 de abril, a las 12:27. Baja despacio: esto es solo para ti.
        </p>
      </motion.div>

      {showMusic && (
        <>
          <audio ref={audioRef} src={MUSIC_URL} loop preload="none" className="hidden" />
          <motion.button
            type="button"
            onClick={toggleAudio}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="fixed z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/20 text-white shadow-lg transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80 max-sm:right-4 max-sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:bottom-8 sm:right-8"
            aria-label={playing ? 'Pausar música' : 'Reproducir música'}
          >
            {playing ? (
              <span className="flex gap-0.5" aria-hidden>
                <span className="h-5 w-1 rounded-sm bg-white" />
                <span className="h-5 w-1 rounded-sm bg-white" />
              </span>
            ) : (
              <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current pl-0.5" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>
        </>
      )}
    </section>
  )
}
