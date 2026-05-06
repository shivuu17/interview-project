import React from 'react'
import { motion } from 'framer-motion'

export default function FinalCTA(){
  return (
    <section className="final-cta-section">
      <div className="final-cta-bg" aria-hidden />
      <div className="final-cta-spotlight" aria-hidden />

      <motion.div
        className="final-cta-shell"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h2 className="final-cta-title">Bring Your Brand<br/>To The Global Stage</h2>
        <p className="final-cta-subtitle">Join 500+ premium brands positioning themselves at the center of cultural moments, consumer engagement, and commerce excellence.</p>

        <div className="final-cta-actions">
          <motion.button className="final-cta-btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Lease Retail Space
          </motion.button>
          <motion.button className="final-cta-btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Sponsor an Event
          </motion.button>
          <motion.button className="final-cta-btn-tertiary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Book Venue / Activation
          </motion.button>
        </div>

        <div className="final-cta-footer">
          <a className="final-cta-footer-link">Download Brochure</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <a className="final-cta-footer-link">Request Proposal</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <a className="final-cta-footer-link">Contact Sales</a>
        </div>
      </motion.div>
    </section>
  )
}
