import { BootLoader } from './components/BootLoader'
import { EasterEgg } from './components/EasterEgg'
import { FooterConstellation } from './components/FooterConstellation'
import { Hero } from './components/Hero'
import { NextAnniversaryLine } from './components/NextAnniversaryLine'
import { PolaroidGallery } from './components/PolaroidGallery'
import { PostGalleryBridge } from './components/PostGalleryBridge'
import { ReasonsCarousel } from './components/ReasonsCarousel'
import { TogetherCounter } from './components/TogetherCounter'

export default function App() {
  return (
    <div className="min-h-svh overflow-x-hidden bg-stone-950 text-stone-100 antialiased">
      <BootLoader>
        <>
          <EasterEgg />
          <main>
            <Hero />
            <div className="relative border-t border-white/5 bg-stone-950 px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10">
              <FooterConstellation />
            </div>
            <PolaroidGallery />
            <PostGalleryBridge />
            <ReasonsCarousel />
            <NextAnniversaryLine />
          </main>
          <TogetherCounter />
        </>
      </BootLoader>
    </div>
  )
}
