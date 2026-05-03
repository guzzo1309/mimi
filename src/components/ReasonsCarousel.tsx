import { motion, useReducedMotion } from 'framer-motion'
import { CAROUSEL_PHRASES } from '../config/site'

export function ReasonsCarousel() {
  const reduceMotion = useReducedMotion()

  const headerEnter = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
  const headerTrans = reduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' as const }

  return (
    <section className="relative border-y border-white/5 bg-stone-950 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          className="mb-8 px-0 sm:mb-10 sm:px-1"
          initial={headerEnter}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={headerTrans}
        >
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Muro de las razones
          </h2>
          <p className="mt-2 text-pretty text-sm text-stone-400 sm:text-base">
            Desliza. Frases que volvería a firmar cada 4 de abril.
          </p>
        </motion.header>

        <div className="snap-x-muted flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden scroll-px-4 px-3 pb-3 [-webkit-overflow-scrolling:touch] sm:gap-4 sm:px-4">
          {CAROUSEL_PHRASES.map((phrase, i) => (
            <motion.article
              key={i}
              className="box-border w-[min(22rem,calc(100dvw-2.5rem))] shrink-0 snap-center rounded-2xl border border-white/15 bg-white/12 p-5 shadow-xl sm:w-[26rem] sm:rounded-3xl sm:bg-white/10 sm:p-8 sm:backdrop-blur-md md:p-10"
              initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { delay: i * 0.03, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
              }
            >
              <p className="font-display text-base leading-relaxed text-pretty text-stone-100 sm:text-lg md:text-xl">
                {phrase}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
