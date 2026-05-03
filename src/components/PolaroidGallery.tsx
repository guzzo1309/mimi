import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import type { Polaroid } from '../config/site'
import { POLAROIDS } from '../config/site'
import { rotationForId } from '../lib/rotationForId'

function PolaroidCard({
  item,
  onOpen,
}: {
  item: Polaroid
  onOpen: (p: Polaroid) => void
}) {
  const tilt = rotationForId(item.id)

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 48, rotate: tilt + 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 18,
        mass: 0.9,
      }}
      whileHover={{ scale: 1.02, rotate: tilt - 1 }}
      whileTap={{ scale: 0.98 }}
      className="group mb-8 w-full cursor-pointer break-inside-avoid text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/80"
    >
      <div className="rounded-sm bg-white p-3 pb-10 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-shadow group-hover:shadow-[0_22px_50px_-10px_rgba(0,0,0,0.5)]">
        <div className="overflow-hidden rounded-[2px] bg-stone-200">
          <img
            src={item.src}
            alt={item.alt}
            className="block w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="mt-3 text-center font-display text-xs italic text-stone-500">
          Toca para leer la dedicatoria
        </p>
      </div>
    </motion.button>
  )
}

export function PolaroidGallery() {
  const [active, setActive] = useState<Polaroid | null>(null)

  const close = useCallback(() => setActive(null), [])

  return (
    <section className="relative bg-linear-to-b from-stone-950 via-stone-900 to-stone-950 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Polaroids digitales
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-stone-400 sm:text-base">
            Recuerdos desde ese primer 4 de abril. Cada foto guarda una dedicatoria.
          </p>
        </motion.header>

        <div className="columns-1 gap-x-6 sm:columns-2 lg:columns-3">
          {POLAROIDS.map((item) => (
            <PolaroidCard key={item.id} item={item} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="polaroid-dialog-title"
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Cerrar"
              onClick={close}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative z-10 m-4 w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:p-6"
            >
              <div className="overflow-hidden rounded-lg bg-white p-2 pb-8 shadow-inner ring-1 ring-black/5">
                <img
                  src={active.src}
                  alt={active.alt}
                  className="max-h-[50dvh] w-full rounded object-contain sm:max-h-[55dvh]"
                />
              </div>
              <h3 id="polaroid-dialog-title" className="sr-only">
                {active.alt}
              </h3>
              <p className="mt-5 font-display text-lg leading-relaxed text-white sm:text-xl">
                {active.reason}
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-6 w-full rounded-xl border border-white/20 bg-white/10 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
