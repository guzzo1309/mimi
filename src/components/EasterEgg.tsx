import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { EASTER_EGG_MESSAGE } from '../config/site'

const TRIPLE_MS = 700

export function EasterEgg() {
  const [open, setOpen] = useState(false)
  const taps = useRef<number[]>([])

  const trigger = useCallback(() => {
    const end = Date.now() + 1600
    const colors = ['#fda4af', '#fde68a', '#c4b5fd', '#ffffff']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
    setOpen(true)
  }, [])

  const onMonogramTap = useCallback(() => {
    const now = Date.now()
    taps.current = taps.current.filter((t) => now - t < TRIPLE_MS)
    taps.current.push(now)
    if (taps.current.length >= 3) {
      taps.current = []
      trigger()
    }
  }, [trigger])

  return (
    <>
      <button
        type="button"
        onClick={onMonogramTap}
        className="fixed left-4 top-4 z-30 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-display text-xs font-medium text-white/50 backdrop-blur-md transition hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/70"
        aria-label="Monograma — easter egg"
      >
        ♡
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="easter"
            role="status"
            className="fixed inset-x-4 bottom-24 z-40 mx-auto max-w-md rounded-2xl border border-rose-200/30 bg-stone-900/95 p-5 text-center shadow-2xl backdrop-blur-md sm:inset-x-auto"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <p className="font-display text-lg leading-relaxed text-rose-50">
              {EASTER_EGG_MESSAGE}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 text-sm font-medium text-rose-200/90 underline-offset-4 hover:underline"
            >
              Cerrar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
