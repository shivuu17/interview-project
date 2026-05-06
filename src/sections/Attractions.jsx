import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const slides = [
  { id: 'theme', title: 'Theme Park', desc: 'Premium attractions with continuous guest engagement and year-round visitation', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80', cta: 'Explore' },
  { id: 'aquarium', title: 'Aquarium', desc: 'Immersive marine experience designed for family luxury and premium dwell time', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80', cta: 'Discover' },
  { id: 'concert', title: 'Concert Venue', desc: 'World-class performance space hosting global artists and brand activations', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80', cta: 'Learn More' },
  { id: 'family', title: 'Family Entertainment', desc: 'Premium experiences engineered for multigenerational engagement and spend', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80', cta: 'Book Now' },
  { id: 'festivals', title: 'Seasonal Festivals', desc: 'Limited-time immersive events creating scarcity and viral social reach', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1600&q=80', cta: 'View Events' }
]

export default function Attractions(){
  const [current, setCurrent] = useState(0)
  const autoPlayRef = useRef(null)

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(autoPlayRef.current)
  }, [])

  const go = (index) => {
    setCurrent(index % slides.length)
    clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 8000)
  }

  return (
    <section className="attractions-section">
      <motion.div className="attractions-header" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
        <div className="attractions-eyebrow">DESTINATION ATTRACTIONS</div>
        <h2 className="attractions-title">Experiences That Anchor The Regional Destination</h2>
      </motion.div>

      <div className="attractions-shell">
        <motion.div className="attractions-carousel" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }}>
          <motion.img
            key={current}
            src={slides[current].img}
            alt={slides[current].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div className="attractions-slide-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h3 className="attractions-slide-title">{slides[current].title}</h3>
            <p className="attractions-slide-desc">{slides[current].desc}</p>
            <button className="attractions-slide-btn">{slides[current].cta} →</button>
          </motion.div>
        </motion.div>

        <div className="attractions-pagination">
          {slides.map((_, i) => (
            <motion.button key={i} className={`attractions-dot ${i === current ? 'active' : ''}`} onClick={() => go(i)} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} />
          ))}
        </div>
      </div>
    </section>
  )
}
