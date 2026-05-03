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
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-[0.55]"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/25 to-black/55" />

      <motion.div
        className="relative z-10 max-w-4xl px-6 text-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-display text-4xl font-semibold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl md:leading-[1.08]">
          <span className="block">{yearsLine}</span>
          <span className="mt-2 block text-white/95">{daysLine}</span>
          <span className="mt-3 block bg-linear-to-r from-rose-100 via-white to-amber-100 bg-clip-text font-medium text-transparent">
            Infinitas razones.
          </span>
        </p>
        <p className="mx-auto mt-8 max-w-md text-sm font-medium text-white/75 motion-safe:animate-pulse sm:text-base">
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
            className="fixed bottom-8 right-8 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80"
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
