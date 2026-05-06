import { useEffect } from 'react'

export default function useMouseGlow(){
  useEffect(()=>{
    const handler = (e)=>{
      document.documentElement.style.setProperty('--mouseX', e.clientX + 'px')
      document.documentElement.style.setProperty('--mouseY', e.clientY + 'px')
    }
    window.addEventListener('mousemove', handler)
    return ()=> window.removeEventListener('mousemove', handler)
  },[])
}
