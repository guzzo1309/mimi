import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BOOT_LOADER_PHRASE, HERO_IMAGE_URL, POLAROIDS } from '../config/site'

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

export function BootLoader({ children }: { children: React.ReactNode }) {
  const [showApp, setShowApp] = useState(false)
  const [exitOverlay, setExitOverlay] = useState(false)
  const [overlayMounted, setOverlayMounted] = useState(true)
  const finishedRef = useRef(false)

  const finishBoot = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    document.documentElement.classList.remove('boot-lock')
    setOverlayMounted(false)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('boot-lock')

    const urls = [HERO_IMAGE_URL, ...POLAROIDS.map((p) => p.src)]
    const imagesReady = Promise.all(urls.map(preloadImage))
    const deadline = new Promise<void>((r) => {
      window.setTimeout(r, 12_000)
    })

    let cancelled = false

    void Promise.race([imagesReady, deadline]).then(() => {
      if (cancelled) return
      const reveal = () => {
        if (cancelled) return
        setShowApp(true)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setExitOverlay(true))
        })
      }
      if (document.fonts?.ready) {
        void document.fonts.ready.then(reveal)
      } else {
        reveal()
      }
    })

    return () => {
      cancelled = true
      document.documentElement.classList.remove('boot-lock')
    }
  }, [])

  useEffect(() => {
    if (!exitOverlay) return
    const fallback = window.setTimeout(finishBoot, 900)
    return () => window.clearTimeout(fallback)
  }, [exitOverlay, finishBoot])

  return (
    <>
      {showApp ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="min-h-dvh"
        >
          {children}
        </motion.div>
      ) : null}

      {overlayMounted ? (
        <motion.div
          role="status"
          aria-live="polite"
          aria-busy={!exitOverlay}
          initial={false}
          animate={{ opacity: exitOverlay ? 0 : 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (exitOverlay) finishBoot()
          }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-stone-950 px-8 text-center ${
            exitOverlay ? 'pointer-events-none' : ''
          }`}
        >
          <motion.span
            className="select-none text-6xl text-rose-400 sm:text-7xl"
            aria-hidden
            animate={
              exitOverlay
                ? { scale: 1, opacity: 0.35 }
                : { scale: [1, 1.12, 1], opacity: [1, 0.92, 1] }
            }
            transition={
              exitOverlay
                ? { duration: 0.35 }
                : { duration: 1.15, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            ♥
          </motion.span>
          <p className="max-w-xs font-display text-lg leading-relaxed text-balance text-stone-200 sm:max-w-sm sm:text-xl">
            {BOOT_LOADER_PHRASE}
          </p>
          <p className="font-sans text-xs text-stone-500">Cargando fotos y tipografías…</p>
        </motion.div>
      ) : null}
    </>
  )
}
