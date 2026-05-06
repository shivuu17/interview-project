import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const tiers = [
  { name: 'Silver', tagline: 'Rising Brand Voice', featured: false, perks: ['Digital signage placement', 'Activation zone access', 'Co-marketing support', '500K monthly impressions', 'Brand asset licensing'] },
  { name: 'Gold', tagline: 'Premium Partnership', featured: true, perks: ['Priority storefronts', 'Dedicated brand zones', 'VIP event hosting', '2M+ monthly impressions', 'Custom campaign co-creation', 'Naming rights consideration'] },
  { name: 'Platinum', tagline: 'Exclusive Dominion', featured: false, perks: ['Exclusive marquee placement', 'Custom branded environments', 'Private VIP lounges', '5M+ monthly impressions', 'Product launch platforms', 'Strategic partnership integration'] }
]

export default function Sponsorship(){
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(card, { y: 28, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.15 + i * 0.12, ease: 'power3.out' })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="sponsorship-section">
      <motion.div className="sponsorship-header" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
        <div className="sponsorship-eyebrow">PARTNERSHIP OPPORTUNITIES</div>
        <h2 className="sponsorship-title">Sponsorship Tiers</h2>
      </motion.div>

      <div className="sponsorship-shell">
        <div className="sponsorship-grid">
          {tiers.map((tier, i) => (
            <motion.article
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`sponsorship-card ${tier.featured ? 'featured' : ''}`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {tier.featured && <div className="sponsorship-badge">FEATURED</div>}
              <h3 className="sponsorship-card-title">{tier.name}</h3>
              <p style={{ fontSize: '13px', color: '#b9b4aa', marginBottom: '20px', fontStyle: 'italic' }}>{tier.tagline}</p>
              <ul className="sponsorship-card-features">
                {tier.perks.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
              <button className="sponsorship-card-btn">Become a Partner</button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
