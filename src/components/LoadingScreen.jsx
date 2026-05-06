import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }){
  const [topLineDone, setTopLineDone] = useState(false)
  const [bottomLineDone, setBottomLineDone] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    if (topLineDone && bottomLineDone && !completedRef.current) {
      completedRef.current = true
      onComplete?.()
    }
  }, [topLineDone, bottomLineDone, onComplete])

  return (
    <div className="loading-screen">
      <motion.div
        initial={{ x: 220, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.15, ease: 'easeInOut' }}
        onAnimationComplete={() => setTopLineDone(true)}
        className="loading-line-top"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="loading-logo"
      >
        MALL OF AMERICA
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        className="loading-subtitle"
      >
        A Premium Destination Sales Experience
      </motion.div>

      <motion.div
        initial={{ x: -220, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.15, delay: 0.3, ease: 'easeInOut' }}
        onAnimationComplete={() => setBottomLineDone(true)}
        style={{ position: 'absolute', bottom: '40px', left: '50%', width: '200px', height: '1px', marginLeft: '-100px', background: 'linear-gradient(90deg,transparent,#C8A96B,transparent)' }}
      />
    </div>
  )
}
