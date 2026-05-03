import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import type { Polaroid } from '../config/site'
import { POLAROIDS } from '../config/site'
import { rotationForId } from '../lib/rotationForId'
import { SIZES_POLAROID } from '../lib/responsiveImage'
import { ResponsivePicture } from './ResponsivePicture'

const MODAL_SIZES = 'min(100vw, 32rem)'

function PolaroidCard({
  item,
  onOpen,
}: {
  item: Polaroid
  onOpen: (p: Polaroid) => void
}) {
  const reduceMotion = useReducedMotion()
  const tilt = rotationForId(item.id)
  const enter = reduceMotion
    ? { opacity: 1, y: 0, rotate: tilt }
    : { opacity: 0, y: 28, rotate: tilt + 2 }
  const trans = reduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as const }

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group mb-8 w-full cursor-pointer break-inside-avoid text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/80 motion-reduce:transition-none"
    >
      <motion.div
        initial={enter}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: tilt }}
        viewport={{ once: true, amount: 0.12 }}
        transition={trans}
        className="w-full"
      >
        <div className="rounded-sm bg-white p-3 pb-10 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-[transform,box-shadow] duration-200 ease-out group-active:scale-[0.99] motion-safe:group-hover:scale-[1.01] motion-safe:group-hover:shadow-[0_22px_50px_-10px_rgba(0,0,0,0.5)]">
          <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-stone-200">
            <ResponsivePicture
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover"
              sizes={SIZES_POLAROID}
              width={480}
              height={600}
              loading="lazy"
              fetchPriority="low"
            />
          </div>
          <p className="mt-3 text-center font-display text-xs italic text-stone-500">
            Toca para leer la dedicatoria
          </p>
        </div>
      </motion.div>
    </button>
  )
}

export function PolaroidGallery() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<Polaroid | null>(null)

  const close = useCallback(() => setActive(null), [])

  const headerEnter = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
  const headerTrans = reduceMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' as const }

  const dialogBackdrop = reduceMotion ? { opacity: 1 } : { opacity: 0 }
  const dialogPanelEnter = reduceMotion ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }
  const dialogPanelExit = reduceMotion ? { y: 0, opacity: 0 } : { y: 24, opacity: 0 }
  const dialogTrans = reduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] as const }

  return (
    <section className="relative bg-linear-to-b from-stone-950 via-stone-900 to-stone-950 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          className="mb-14 text-center"
          initial={headerEnter}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={headerTrans}
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
            initial={dialogBackdrop}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/80"
              aria-label="Cerrar"
              onClick={close}
            />
            <motion.div
              initial={dialogPanelEnter}
              animate={{ y: 0, opacity: 1 }}
              exit={dialogPanelExit}
              transition={dialogTrans}
              className="relative z-10 mx-auto mb-[max(1rem,env(safe-area-inset-bottom))] mt-auto w-[min(100%,calc(100dvw-1rem))] max-w-lg max-h-[90dvh] overflow-y-auto overflow-x-hidden rounded-2xl border border-white/15 bg-stone-950/95 p-3 shadow-2xl sm:m-4 sm:mb-4 sm:mt-0 sm:max-h-none sm:w-full sm:overflow-visible sm:bg-white/10 sm:p-6 sm:backdrop-blur-md"
            >
              <div className="overflow-hidden rounded-lg bg-white p-2 pb-8 shadow-inner ring-1 ring-black/5">
                <ResponsivePicture
                  src={active.src}
                  alt={active.alt}
                  className="max-h-[50dvh] w-full rounded object-contain sm:max-h-[55dvh]"
                  sizes={MODAL_SIZES}
                  width={800}
                  height={1000}
                  loading="eager"
                />
              </div>
              <h3 id="polaroid-dialog-title" className="sr-only">
                {active.alt}
              </h3>
              <p className="mt-4 font-display text-base leading-relaxed text-pretty text-white sm:mt-5 sm:text-lg md:text-xl">
                {active.reason}
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-6 w-full rounded-xl border border-white/20 bg-white/10 py-3 text-sm font-medium text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/80"
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
