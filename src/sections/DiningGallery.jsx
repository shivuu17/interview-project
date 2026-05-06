import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const diningItems = [
  { id: 1, category: 'Fine Dining', title: 'Michelin-Worthy', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, category: 'Casual Luxury', title: 'Culinary Concept', img: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, category: 'Premium Lounge', title: 'VIP Social Hub', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, category: 'Market Hall', title: 'Global Flavors', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, category: 'Patisserie', title: 'Artisanal Craft', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, category: 'Wine Bar', title: 'Curated Selection', img: 'https://images.unsplash.com/photo-1521095081784-c7db236b0efa?auto=format&fit=crop&w=1200&q=80' }
]

export default function DiningGallery(){
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(card, { y: 24, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, delay: 0.1 + i * 0.08, ease: 'power3.out' })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="dining-section">
      <motion.div className="dining-header" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
        <div className="dining-eyebrow">CULINARY EXCELLENCE</div>
        <h2 className="dining-title">Dining & Lifestyle Premier</h2>
        <p className="dining-subtitle">Curated restaurant experiences, premium lounges, and exclusive dining events engineered for high-spending luxury consumers.</p>
      </motion.div>

      <div className="dining-shell">
        <div className="dining-grid">
          {diningItems.map((item, i) => (
            <motion.article key={item.id} ref={(el) => (cardRefs.current[i] = el)} className="dining-card" whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
              <img src={item.img} alt={item.title} />
              <div className="dining-card-panel">
                <div className="dining-card-category">{item.category}</div>
                <h3 className="dining-card-title">{item.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
