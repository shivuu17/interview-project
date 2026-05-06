import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const features = [
  { icon: '✦', label: 'VIP Retail', desc: 'Private concierge and exclusive shopping experiences' },
  { icon: '◈', label: 'Private Access', desc: 'Members-only lounges and VIP buyer previews' },
  { icon: '▣', label: 'Premium Audience', desc: 'Affluent, high-intent luxury consumers' },
  { icon: '◌', label: 'Luxury Positioning', desc: 'Editorial showcases and bespoke brand storytelling' }
]

export default function LuxuryExperience(){
  const cardRefs = useRef([])
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(card, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.15 + i * 0.08, ease: 'power3.out' })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="luxury-xp-section">
      <div className="luxury-xp-overlay" aria-hidden />

      <div className="luxury-xp-shell">
        <motion.div className="luxury-xp-header" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
          <div className="luxury-xp-eyebrow">PREMIUM EXPERIENCE</div>
          <h2 className="luxury-xp-title">A Curated Sanctuary For Luxury Brands</h2>
          <p className="luxury-xp-subtitle">Bespoke retail environments, VIP concierge, and curated buyer experiences engineered for premium engagement and long-term brand affinity.</p>
        </motion.div>

        <div className="luxury-xp-grid">
          <div className="luxury-xp-left">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }}>
              <div className="luxury-xp-text">
                <h3 className="luxury-xp-headline">Reserved For The Discerning</h3>
                <div className="luxury-xp-divider" />
                <p className="luxury-xp-body">Beyond retail. A destination where luxury brands command undivided attention, where premium positioning translates to measurable commercial impact.</p>
              </div>
            </motion.div>
          </div>

          <div className="luxury-xp-right">
            <div className="luxury-xp-cards">
              {features.map((f, i) => (
                <motion.div key={i} ref={(el) => (cardRefs.current[i] = el)} className="luxury-xp-card" whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                  <div className="xp-card-icon">{f.icon}</div>
                  <h4 className="xp-card-label">{f.label}</h4>
                  <p className="xp-card-desc">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
