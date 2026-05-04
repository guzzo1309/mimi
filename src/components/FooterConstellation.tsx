import { Horizon, Observer } from 'astronomy-engine'
import { useMemo } from 'react'
import {
  STARFIELD_AFTER_SKY,
  STARFIELD_AFTER_SKY_CAPTION,
  STARFIELD_HEADLINE,
  STARFIELD_LINE_PAIRS,
  STARFIELD_MIN_ALTITUDE_DEG,
  STARFIELD_MOMENT_ISO,
  STARFIELD_OBSERVER,
  STARFIELD_SUBLINE,
} from '../config/starfield'
import { BRIGHT_STARS_CATALOG } from '../data/brightStarsCatalog'
import { altAzToStarfieldXy, starOpacity, starRadiusPx } from '../lib/starfieldGeometry'

type StarPos = { id: string; name: string; x: number; y: number; mag: number }

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function microStarField(seed: string, count: number, avoid: { x: number; y: number }[]) {
  const rand = mulberry32(hashString(seed))
  const out: { x: number; y: number; r: number; o: number }[] = []
  let tries = 0
  const minDist = 2.8
  while (out.length < count && tries < 4000) {
    tries++
    const x = rand() * 100
    const y = rand() * 100
    if (avoid.some((p) => Math.hypot(p.x - x, p.y - y) < minDist)) continue
    out.push({
      x,
      y,
      r: 0.06 + rand() * 0.14,
      o: 0.1 + rand() * 0.22,
    })
  }
  return out
}

const GLOW_MAG = 1.35

export function FooterConstellation() {
  const { stars, segments, micros } = useMemo(() => {
    const date = new Date(STARFIELD_MOMENT_ISO)
    const obs = new Observer(
      STARFIELD_OBSERVER.latitudeDeg,
      STARFIELD_OBSERVER.longitudeDeg,
      STARFIELD_OBSERVER.heightMeters,
    )

    const positions = new Map<string, StarPos>()
    for (const s of BRIGHT_STARS_CATALOG) {
      const h = Horizon(date, obs, s.raHours, s.decDeg, 'normal')
      if (h.altitude < STARFIELD_MIN_ALTITUDE_DEG) continue
      const { x, y } = altAzToStarfieldXy(h.azimuth, h.altitude)
      positions.set(s.id, { id: s.id, name: s.name, x, y, mag: s.mag })
    }

    const segs: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (const [a, b] of STARFIELD_LINE_PAIRS) {
      const p = positions.get(a)
      const q = positions.get(b)
      if (!p || !q) continue
      segs.push({ x1: p.x, y1: p.y, x2: q.x, y2: q.y })
    }

    const starList = [...positions.values()]
    const avoid = starList.map((s) => ({ x: s.x, y: s.y }))
    const micros = microStarField('margarita-2023-04-04', 95, avoid)

    return { stars: starList, segments: segs, micros }
  }, [])

  return (
    <section
      className="relative mx-auto mt-0 max-w-4xl overflow-hidden rounded-[2rem] border border-white/[0.12] bg-black shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-[2.25rem]"
      aria-labelledby="constellation-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_38%,rgba(120,80,160,0.18),transparent_62%),radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(244,63,94,0.08),transparent_45%)]" />

      <div className="relative z-10 px-5 pb-4 pt-9 text-center sm:px-10 sm:pt-11">
        <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-rose-200/55">
          Isla Margarita · 4 abr 2023 · 22:30
        </p>
        <h2
          id="constellation-heading"
          className="mx-auto mt-3 max-w-lg font-display text-xl font-semibold leading-snug text-white sm:text-2xl"
        >
          {STARFIELD_HEADLINE}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-pretty text-xs leading-relaxed text-stone-400 sm:text-sm">
          {STARFIELD_SUBLINE}
        </p>
      </div>

      <div
        className="constellation-drift relative z-[1] mx-auto aspect-[5/4] w-full max-w-3xl sm:aspect-[10/7]"
        aria-hidden
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="footer-sky-vignette" cx="50%" cy="42%" r="72%">
              <stop offset="0%" stopColor="rgb(28,22,48)" stopOpacity="0.55" />
              <stop offset="55%" stopColor="rgb(8,6,14)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(0,0,0)" stopOpacity="0.92" />
            </radialGradient>
            <radialGradient id="footer-star-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(255,250,255)" stopOpacity="0.9" />
              <stop offset="40%" stopColor="rgb(255,220,240)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(255,200,220)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="footer-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,214,230,0.5)" />
              <stop offset="50%" stopColor="rgba(200,210,255,0.35)" />
              <stop offset="100%" stopColor="rgba(255,214,230,0.22)" />
            </linearGradient>
          </defs>

          <rect width="100" height="100" fill="url(#footer-sky-vignette)" />

          {micros.map((m, i) => (
            <circle key={`m-${i}`} cx={m.x} cy={m.y} r={m.r} fill="#fff" fillOpacity={m.o} />
          ))}

          {segments.map((s, i) => (
            <line
              key={`seg-soft-${i}`}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="url(#footer-line-grad)"
              strokeWidth={0.26}
              strokeLinecap="round"
              opacity={0.45}
            />
          ))}

          {segments.map((s, i) => (
            <line
              key={`seg-core-${i}`}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={0.09}
              strokeLinecap="round"
            />
          ))}

          {stars.map((s) => {
            const r = starRadiusPx(s.mag)
            const o = starOpacity(s.mag)
            const bright = s.mag <= GLOW_MAG
            return (
              <g key={s.id}>
                {bright ? (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={r * 3.2}
                    fill="url(#footer-star-halo)"
                    fillOpacity={0.55}
                  />
                ) : null}
                <circle cx={s.x} cy={s.y} r={r * 1.85} fill="white" fillOpacity={o * 0.2} />
                <circle cx={s.x} cy={s.y} r={r} fill="white" fillOpacity={o} />
                {bright ? (
                  <circle cx={s.x} cy={s.y} r={r * 0.35} fill="white" fillOpacity={0.95} />
                ) : null}
              </g>
            )
          })}
        </svg>
      </div>

      {STARFIELD_AFTER_SKY.trim() ? (
        <div className="relative z-10 border-t border-white/[0.06] px-6 pb-10 pt-8 text-center sm:px-10 sm:pb-12 sm:pt-9">
          <p className="mx-auto max-w-md font-display text-sm font-medium italic leading-relaxed text-rose-100/85 sm:text-base">
            {STARFIELD_AFTER_SKY.trim()}
          </p>
          {STARFIELD_AFTER_SKY_CAPTION.trim() ? (
            <p className="mx-auto mt-4 text-[11px] font-medium tracking-wide text-stone-500 sm:text-xs">
              {STARFIELD_AFTER_SKY_CAPTION.trim()}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="relative z-10 h-4 sm:h-6" aria-hidden />
      )}
    </section>
  )
}
