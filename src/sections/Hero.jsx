import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import ThreeParticles from '../components/ThreeParticles'

const LOCAL_HERO_IMAGE = '/hero-image.jpg'
const FALLBACK_HERO_IMAGE = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=80'

const stats = [
  { label: '40M+', value: 'Visitors' },
  { label: '500+', value: 'Retailers' },
  { label: '100+', value: 'Dining' },
  { label: 'Global', value: 'Destination' }
]

function ImageBackground({ src, onError }){
  return (
    <img
      className="hero-image"
      src={src}
      alt="Skyline backdrop"
      loading="eager"
      fetchPriority="high"
      onError={onError}
    />
  )
}

export default function Hero(){
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const glowRef = useRef(null)
  const statsRef = useRef([])
  const [activeHover, setActiveHover] = useState(false)
  const [heroImageSrc, setHeroImageSrc] = useState(LOCAL_HERO_IMAGE)

  useEffect(()=>{
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, {
        y: 36,
        opacity: 0,
        clipPath: 'inset(0 0 100% 0)'
      }, {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power4.out'
      })

      gsap.fromTo(subtitleRef.current, {
        y: 18,
        opacity: 0,
        filter: 'blur(6px)'
      }, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.95,
        delay: 0.28,
        ease: 'power3.out'
      })

      gsap.fromTo(ctaRef.current?.children || [], {
        y: 18,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        stagger: 0.12,
        ease: 'power3.out'
      })

      gsap.fromTo(statsRef.current, {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        delay: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
      })

      const heroImage = heroRef.current?.querySelector('.hero-image')
      if (heroImage) {
        gsap.to(heroImage, {
          scale: 1.1,
          duration: 24,
          ease: 'none',
          repeat: -1,
          yoyo: true
        })
      }
    }, heroRef)

    const onMove = (event) => {
      document.documentElement.style.setProperty('--mouseX', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouseY', `${event.clientY}px`)

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${event.clientX * 0.018}px, ${event.clientY * 0.018}px, 0)`
      }
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={heroRef} className="hero-section hero-executive">
      <ImageBackground
        src={heroImageSrc}
        onError={() => {
          if (heroImageSrc !== FALLBACK_HERO_IMAGE) {
            setHeroImageSrc(FALLBACK_HERO_IMAGE)
          }
        }}
      />
      <ThreeParticles opacity={0.07} />

      <div ref={glowRef} className={`hero-ambient-glow ${activeHover ? 'is-active' : ''}`} />
      <div className="hero-overlay hero-overlay-main" />
      <div className="hero-overlay hero-overlay-vignette" />
      <div className="hero-overlay hero-overlay-grain" />

      <div className="hero-shell">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="hero-kicker hero-badge"
        >
          Destination Sales Experience
        </motion.div>

        <div className="hero-copy hero-copy-luxury">
          <motion.h1 ref={titleRef} className="hero-title hero-title-luxury">
            <span>NOT A SHOPPING CENTER</span>
            <span>A GLOBAL DESTINATION</span>
          </motion.h1>

          <motion.p ref={subtitleRef} className="hero-subtitle hero-subtitle-luxury">
            Where commerce, luxury, entertainment, and unforgettable experiences converge under one roof.
          </motion.p>
        </div>

        <div ref={ctaRef} className="hero-actions hero-actions-luxury">
          <button
            onMouseEnter={() => setActiveHover(true)}
            onMouseLeave={() => setActiveHover(false)}
            onClick={() => document.getElementById('retail')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-gold hero-cta-primary hero-cta-luxe"
          >
            <span>Explore Opportunity</span>
            <span className="btn-icon">→</span>
          </button>
          <button
            onMouseEnter={() => setActiveHover(true)}
            onMouseLeave={() => setActiveHover(false)}
            className="btn btn-outline hero-cta-secondary hero-cta-glass"
          >
            <span>Watch Experience</span>
            <span className="btn-icon">↗</span>
          </button>
        </div>

        <div className="hero-kpi-grid">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              ref={(node) => { statsRef.current[index] = node }}
              className="hero-kpi-card"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="hero-kpi-value">{item.label}</div>
              <div className="hero-kpi-label">{item.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="hero-scroll-indicator" aria-hidden="true">
          <span>Scroll to explore</span>
          <div className="hero-scroll-track">
            <div className="hero-scroll-dot" />
          </div>
        </div>
      </div>
    </section>
  )
}
