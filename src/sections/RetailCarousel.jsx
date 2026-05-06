import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const CARDS = [
  {
    id: 'flagship',
    category: 'Luxury Fashion',
    title: 'Flagship Destinations For Global Maisons',
    desc: 'Premium storefronts and curated boutiques designed to elevate heritage labels and seasonal collections.',
    img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'dining',
    category: 'Premium Dining',
    title: 'Culinary Boulevards & Destination Dining',
    desc: 'Restaurant-lined promenades and concept dining that extend dwell-time and experiential value.',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'tech',
    category: 'Technology Experience',
    title: 'Immersive Product Theatres',
    desc: 'Interactive showrooms and launch stages for marquee technology experiences and brand storytelling.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'activation',
    category: 'Brand Activations',
    title: 'Campaign-Scale Activation Pavilions',
    desc: 'Iconic pop-ups and multi-sensory activations built for cultural impact and measurable reach.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'popup',
    category: 'Pop-up Pavilion',
    title: 'Seasonal Flagships & Limited Editions',
    desc: 'Temporary experiences crafted to convert scarcity into long-term brand affinity.',
    img: 'https://images.unsplash.com/photo-1495121605193-b116b5b09a26?auto=format&fit=crop&w=1600&q=80'
  }
]

const KPI_CHIPS = [
  '250+ Premium Brands',
  'Global Exposure',
  'High Dwell Time',
  'Year-Round Foot Traffic',
  'Experiential Retail'
]

export default function RetailCarousel(){
  const root = useRef(null)
  const cardEls = useRef([])
  const floatEls = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardEls.current,
        { y: 28, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.08, ease: 'power3.out' }
      )

      gsap.to(floatEls.current, {
        y: '+=18',
        rotation: 0.4,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.28
      })
    }, root)

    const onMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.02
      const y = (e.clientY - window.innerHeight / 2) * 0.02
      gsap.to(cardEls.current, { x: x, y: y, stagger: 0.02, duration: 0.9, ease: 'power3.out' })
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      ctx.revert()
    }
  }, [])

  return (
    <section ref={root} className="retail-section">
      <div className="retail-overlay" aria-hidden />
      <div className="retail-spotlight" aria-hidden />
      <div className="retail-grain" aria-hidden />

      <div className="retail-shell">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: 'power3.out' }}
          className="retail-header"
        >
          <div className="retail-eyebrow">RETAIL DESTINATION</div>
          <div className="retail-title">Where Global Brands<br/>Become Experiences</div>
          <p className="retail-subtitle">From flagship luxury boutiques to immersive brand activations, every square foot is engineered for premium visibility, unforgettable engagement, and measurable commercial impact.</p>
          <div className="retail-eyeline" />
        </motion.header>

        <motion.div className="retail-marquee" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {['Luxury Fashion','Technology','Lifestyle','Dining','Entertainment','Pop-ups','Flagship Stores'].map((t) => (
            <div key={t} className="marquee-chip">{t}</div>
          ))}
        </motion.div>

        <div className="retail-grid">
          <div className="retail-left">
            {CARDS.slice(0,1).map((c, i) => (
              <article key={c.id} ref={(el) => (cardEls.current[i] = el)} className="retail-card retail-card-hero">
                <div className="retail-media"><img src={c.img} alt={c.title} /></div>
                <div className="glass-panel">
                  <div className="panel-category">{c.category}</div>
                  <h3 className="panel-title">{c.title}</h3>
                  <p className="panel-desc">{c.desc}</p>
                  <div className="panel-cta"><button className="btn btn-gold">Explore Leasing <span className="btn-icon">→</span></button></div>
                </div>
              </article>
            ))}
          </div>

          <div className="retail-right">
            {CARDS.slice(1,3).map((c, idx) => (
              <article key={c.id} ref={(el) => (cardEls.current[1 + idx] = el)} className="retail-card retail-card-side">
                <div className="retail-media"><img src={c.img} alt={c.title} /></div>
                <div className="glass-panel small">
                  <div className="panel-category">{c.category}</div>
                  <h4 className="panel-title small">{c.title}</h4>
                  <p className="panel-desc small">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="retail-bottom">
            {CARDS.slice(3,5).map((c, idx) => (
              <article key={c.id} ref={(el) => (cardEls.current[3 + idx] = el)} className="retail-card retail-card-wide">
                <div className="retail-media"><img src={c.img} alt={c.title} /></div>
                <div className="glass-panel">
                  <div className="panel-category">{c.category}</div>
                  <h4 className="panel-title small">{c.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>

        {KPI_CHIPS.map((k, i) => (
          <div key={k} ref={(el) => (floatEls.current[i] = el)} className={`kpi-chip kpi-chip-${i+1}`} aria-hidden>{k}</div>
        ))}

        <div className="retail-cta">
          <h3 className="retail-cta-title">Position Your Brand<br/>At The Center Of Attention</h3>
          <div className="retail-cta-actions">
            <button className="btn btn-gold">Explore Leasing</button>
            <button className="btn btn-outline">View Opportunities</button>
          </div>
        </div>
      </div>
    </section>
  )
}
