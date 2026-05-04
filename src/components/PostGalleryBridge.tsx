import { motion, useReducedMotion } from 'framer-motion'
import { POST_GALLERY_BODY, POST_GALLERY_KICKER, POST_GALLERY_TITLE } from '../config/site'

export function PostGalleryBridge() {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <section className="relative border-t border-white/5 bg-linear-to-b from-stone-950 via-stone-900/95 to-stone-950 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(244,63,94,0.1),transparent_55%)]" />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={transition}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-rose-200/65">
            {POST_GALLERY_KICKER}
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            {POST_GALLERY_TITLE}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-sm leading-relaxed text-stone-400 sm:text-base">
            {POST_GALLERY_BODY}
          </p>
          <div
            className="mx-auto mt-10 h-px max-w-xs bg-linear-to-r from-transparent via-rose-300/35 to-transparent"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  )
}
