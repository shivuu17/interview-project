import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div /> }>
      <App />
    </Suspense>
  </React.StrictMode>
)
