import { EasterEgg } from './components/EasterEgg'
import { Hero } from './components/Hero'
import { PolaroidGallery } from './components/PolaroidGallery'
import { ReasonsCarousel } from './components/ReasonsCarousel'
import { TogetherCounter } from './components/TogetherCounter'

export default function App() {
  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100 antialiased">
      <EasterEgg />
      <main>
        <Hero />
        <PolaroidGallery />
        <ReasonsCarousel />
        <TogetherCounter />
      </main>
    </div>
  )
}
