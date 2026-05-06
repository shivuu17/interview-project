import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import ScrollNav from './components/ScrollNav'
import Hero from './sections/Hero'
import WhyProperty from './sections/WhyProperty'
import LuxuryExperience from './sections/LuxuryExperience'
import DiningGallery from './sections/DiningGallery'
import Attractions from './sections/Attractions'
import Events from './sections/Events'
import Sponsorship from './sections/Sponsorship'
import FinalCTA from './sections/FinalCTA'
import useMouseGlow from './hooks/useMouseGlow'

export default function App(){
  useMouseGlow()
  const [loaded, setLoaded] = useState(false)
  const [RetailComponent, setRetailComponent] = useState(null)

  return (
    <AnimatePresence mode="wait">
      {!loaded ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <LoadingScreen onComplete={() => setLoaded(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="site-content"
          className="mouse-glow"
          initial={{ opacity: 0, y: 24, scale: 1.01, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Navbar />
          <ScrollNav />

          <main className="overflow-x-hidden">
            <section id="hero"><Hero /></section>
            <section id="why"><WhyProperty /></section>
            <section id="retail">
              {RetailComponent ? (
                <RetailComponent />
              ) : (
                <div className="min-h-[70vh] py-20 container mx-auto px-6 glass rounded text-center">
                  <h2 className="text-3xl font-semibold">Retail Opportunity</h2>
                  <p className="mt-2 text-white/80">Interactive carousel is available on demand to avoid dev-server import issues.</p>
                  <div className="mt-6">
                    <button className="gold-btn px-6 py-3 rounded-full" onClick={async ()=>{
                      const mod = await import('./sections/RetailCarousel')
                      setRetailComponent(()=>mod.default)
                    }}>Load Retail Opportunities</button>
                  </div>
                </div>
              )}
            </section>
            <section id="luxury"><LuxuryExperience /></section>
            <section id="dining"><DiningGallery /></section>
            <section id="attractions"><Attractions /></section>
            <section id="events"><Events /></section>
            <section id="sponsorship"><Sponsorship /></section>
            <section id="cta"><FinalCTA /></section>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
