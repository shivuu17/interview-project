import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function WhyProperty(){
  const cardRefs = useRef([])
  const nodeRefs = useRef([])
  const kpiRefs = useRef([])
  const valueRefs = useRef([])

  const metrics = [
    { id: 'visitors', label: 'Annual Visitors', value: 40, suffix: 'M+', icon: '✦' },
    { id: 'brands', label: 'Retail Brands', value: 500, suffix: '+', icon: '◌' },
    { id: 'dining', label: 'Dining Concepts', value: 100, suffix: '+', icon: '◈' },
    { id: 'footprint', label: 'Destination Footprint', value: 5, suffix: 'M+ Sq Ft', icon: '▣' }
  ]

  const reachPoints = [
    { id: 'north', label: 'Twin Cities', x: 28, y: 34, delay: 0 },
    { id: 'west', label: 'Midwest Core', x: 18, y: 58, delay: 1 },
    { id: 'south', label: 'Regional Trade Area', x: 46, y: 68, delay: 2 },
    { id: 'east', label: 'National Visitors', x: 72, y: 42, delay: 3 },
    { id: 'global', label: 'Global Awareness', x: 82, y: 22, delay: 4 }
  ]

  const kpiStrip = [
    'Affluent Audience',
    'Premium Spend',
    'High Dwell Time',
    'Year-Round Traffic'
  ]

  useEffect(()=>{
    cardRefs.current.forEach((card, index)=>{
      gsap.fromTo(card, {
        y: 24,
        opacity: 0,
        scale: 0.98
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        delay: 0.15 + index * 0.08,
        ease: 'power3.out'
      })
    })

    nodeRefs.current.forEach((node, index)=>{
      gsap.fromTo(node, {
        scale: 0.8,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.35 + index * 0.06,
        ease: 'power2.out'
      })
    })

    kpiRefs.current.forEach((kpi, index)=>{
      gsap.fromTo(kpi, {
        y: 18,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.55 + index * 0.08,
        ease: 'power2.out'
      })
    })

    valueRefs.current.forEach((node, index) => {
      const metric = metrics[index]
      if (!node || !metric) return

      const counter = { value: 0 }
      gsap.to(counter, {
        value: metric.value,
        duration: 1.6,
        delay: 0.22 + index * 0.08,
        ease: 'power2.out',
        onUpdate: () => {
          const current = Math.round(counter.value)
          node.textContent = `${current}${metric.suffix}`
        },
        onComplete: () => {
          node.textContent = `${metric.value}${metric.suffix}`
        }
      })
    })
  }, [])

  return (
    <section className="why-section">
      <div className="why-luxury-ambient" aria-hidden="true" />
      <div className="why-luxury-texture" aria-hidden="true" />

      <div className="container why-shell">
        <div className="why-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="why-copy"
          >
            <div className="why-eyebrow">GLOBAL COMMERCIAL OPPORTUNITY</div>
            <h2 className="why-title">Why This Property Commands Attention</h2>
            <p className="why-subtitle">
              A destination engineered for extraordinary reach, premium customer engagement, and unmatched commercial upside.
            </p>
            <p className="why-body">
              From boardroom strategy to guest-level excitement, Mall of America combines scale, lifestyle gravity, and year-round traffic into a premium platform for brands seeking cultural relevance and measurable performance.
            </p>

            <div className="why-copy-line" />

            <div className="why-mini-notes">
              <span>Luxury retail ecosystem</span>
              <span>High-intent visitors</span>
              <span>Destination-level dwell time</span>
            </div>
          </motion.div>

          <div className="why-metrics-panel">
            <div className="why-metrics-grid">
              {metrics.map((metric, index) => (
                <motion.article
                  key={metric.id}
                  ref={(node) => { cardRefs.current[index] = node }}
                  className="why-metric-card"
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="why-metric-top">
                    <div className="why-metric-icon">{metric.icon}</div>
                    <div className="why-metric-status">Premium Signal</div>
                  </div>
                  <div className="why-metric-value" ref={(node) => { valueRefs.current[index] = node }}>
                    0{metric.suffix}
                  </div>
                  <div className="why-metric-label">{metric.label}</div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className="why-analytics-row">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="why-network-panel"
          >
            <div className="why-panel-heading">
              <div>
                <div className="why-panel-kicker">Audience Reach</div>
                <h3 className="why-panel-title">Regional reach with national confidence</h3>
              </div>
              <div className="why-panel-chip">Interactive network view</div>
            </div>

            <div className="why-network-graph">
              <svg viewBox="0 0 100 100" className="why-network-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="whyLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(232,217,181,0.25)" />
                    <stop offset="100%" stopColor="rgba(200,169,107,0.9)" />
                  </linearGradient>
                </defs>
                {[
                  ['28,34', '46,68'],
                  ['28,34', '18,58'],
                  ['28,34', '72,42'],
                  ['46,68', '82,22'],
                  ['72,42', '82,22'],
                  ['18,58', '46,68']
                ].map(([start, end], index) => (
                  <line key={`${start}-${end}-${index}`} x1={start.split(',')[0]} y1={start.split(',')[1]} x2={end.split(',')[0]} y2={end.split(',')[1]} stroke="url(#whyLine)" strokeWidth="0.6" />
                ))}
                {reachPoints.map((point, index) => (
                  <g key={point.id} ref={(node) => { nodeRefs.current[index] = node }}>
                    <circle cx={point.x} cy={point.y} r="2" fill="#C8A96B" />
                    <circle cx={point.x} cy={point.y} r="5" fill="rgba(200,169,107,0.12)" className="why-network-pulse" style={{ animationDelay: `${point.delay * 0.5}s` }} />
                  </g>
                ))}
                <circle cx="52" cy="46" r="6.5" fill="rgba(255,255,255,0.09)" stroke="rgba(232,217,181,0.85)" strokeWidth="0.7" />
                <circle cx="52" cy="46" r="2.2" fill="#F5F2EA" />
              </svg>

              <div className="why-network-node why-network-node-main" style={{ left: '52%', top: '46%' }}>
                Mall of America
              </div>
              {reachPoints.map((point) => (
                <motion.div
                  key={point.id}
                  className="why-network-node"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{point.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.08 }}
            className="why-kpi-panel"
          >
            <div className="why-panel-heading">
              <div>
                <div className="why-panel-kicker">Luxury KPI Strip</div>
                <h3 className="why-panel-title">Boardroom-level engagement signals</h3>
              </div>
            </div>

            <div className="why-kpi-strip">
              {kpiStrip.map((item, index) => (
                <motion.div
                  key={item}
                  ref={(node) => { kpiRefs.current[index] = node }}
                  className="why-kpi-chip"
                  whileHover={{ y: -4 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
