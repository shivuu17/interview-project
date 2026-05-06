import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'why', label: 'Why This Property' },
  { id: 'retail', label: 'Retail' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'dining', label: 'Dining' },
  { id: 'attractions', label: 'Attractions' },
  { id: 'events', label: 'Events' },
  { id: 'sponsorship', label: 'Sponsorship' },
  { id: 'cta', label: 'Partnership' }
]

export default function Navbar(){
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const navRef = useRef(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1280)
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean)
      let current = 'hero'
      for (const section of sections) {
        if (section.getBoundingClientRect().top < 200) {
          current = section.id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!isSmallScreen) {
      setIsMobileMenuOpen(false)
    }
  }, [isSmallScreen])

  return (
    <>
      <motion.header ref={navRef} className="cinema-navbar" initial={{ y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}>
        <div className="cinema-navbar-shell" style={{ height: isScrolled ? '72px' : '92px' }}>
          <motion.button className="cinema-logo" onClick={() => scrollTo('hero')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <div className="cinema-logo-icon">◆</div>
            <div className="cinema-logo-text">Mall of America</div>
          </motion.button>

          {!isSmallScreen && (
            <nav className="cinema-nav-links">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`cinema-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div className="cinema-nav-underline" layoutId="navUnderline" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                  )}
                </motion.button>
              ))}
            </nav>
          )}

          {!isSmallScreen && (
            <motion.button className="cinema-cta" onClick={() => scrollTo('cta')} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              Book A Meeting
            </motion.button>
          )}

          {isSmallScreen && (
            <motion.button className="cinema-hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} />
              <motion.span animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} />
              <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} />
            </motion.button>
          )}
        </div>

        <div className="cinema-navbar-glow" aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && isSmallScreen && (
          <motion.div
            className="cinema-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="cinema-mobile-menu-shell">
              <nav className="cinema-mobile-nav">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    className={`cinema-mobile-link ${activeSection === link.id ? 'active' : ''}`}
                    onClick={() => scrollTo(link.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <motion.button
                className="cinema-mobile-cta"
                onClick={() => scrollTo('cta')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
              >
                Book A Meeting
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
