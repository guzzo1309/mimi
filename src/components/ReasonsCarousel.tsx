import { motion } from 'framer-motion'
import { CAROUSEL_PHRASES } from '../config/site'

export function ReasonsCarousel() {
  return (
    <section className="relative border-y border-white/5 bg-stone-950 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          className="mb-10 px-1"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Muro de las razones
          </h2>
          <p className="mt-2 text-sm text-stone-400 sm:text-base">
            Desliza. Frases que volvería a firmar cada 4 de abril.
          </p>
        </motion.header>

        <div className="snap-x-muted -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:gap-5 md:-mx-6 md:px-6">
          {CAROUSEL_PHRASES.map((phrase, i) => (
            <motion.article
              key={i}
              className="min-w-[min(88vw,420px)] shrink-0 snap-center rounded-3xl border border-white/15 bg-white/10 p-8 shadow-xl backdrop-blur-md md:min-w-[440px] md:p-10"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.04, duration: 0.45 }}
            >
              <p className="font-display text-lg leading-relaxed text-stone-100 md:text-xl">
                {phrase}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
