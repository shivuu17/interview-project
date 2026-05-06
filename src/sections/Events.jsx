import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const timeline = [
  { year: 2024, title: 'Global Concert Series', desc: 'Marquee performing artists curated for cultural relevance and brand elevation', metrics: ['500K+ Attendees', '$12M+ Direct Impact'] },
  { year: 2025, title: 'Tech & Innovation Expo', desc: 'Flagship product launches for global technology leaders and future-forward brands', metrics: ['300K+ Visitors', '$8M+ Partnership Value'] },
  { year: 2026, title: 'Seasonal Festival Experience', desc: 'Immersive holiday and cultural celebrations engineered for maximum foot traffic', metrics: ['2M+ Visitors', '$25M+ Retail Uplift'] },
  { year: 2027, title: 'Fashion & Luxury Showcase', desc: 'Premium fashion presentations and designer collaborations for affluent audiences', metrics: ['150K+ Attendees', '$18M+ Premium Spend'] }
]

export default function Events(){
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(card, { y: 28, opacity: 0, x: i % 2 === 0 ? -20 : 20 }, { y: 0, opacity: 1, x: 0, duration: 0.9, delay: 0.15 + i * 0.1, ease: 'power3.out' })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="events-section">
      <motion.div className="events-header" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
        <div className="events-eyebrow">EVENTS & ACTIVATIONS</div>
        <h2 className="events-title">Platform For Global Moments</h2>
      </motion.div>

      <div className="events-shell">
        <motion.div className="events-timeline" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
          {timeline.map((event, i) => (
            <motion.div key={i} ref={(el) => (cardRefs.current[i] = el)} className="events-item">
              <div className="events-item-year">{event.year}</div>
              <div className="events-card">
                <h3 className="events-card-title">{event.title}</h3>
                <p className="events-card-desc">{event.desc}</p>
                <div className="events-card-meta">
                  {event.metrics.map((m, j) => (
                    <div key={j} className="events-meta-pill">{m}</div>
                  ))}
                </div>
                <button className="events-card-btn">Learn More →</button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-center" style={{ marginTop: '60px' }}>
          <button className="attractions-slide-btn">Book Event Space →</button>
        </motion.div>
      </div>
    </section>
  )
}
