import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeParticles({opacity=0.06}){
  const ref = useRef()

  useEffect(()=>{
    const el = ref.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 1, 1000)
    camera.position.z = 100

    const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true})
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    el.appendChild(renderer.domElement)

    const geometry = new THREE.BufferGeometry()
    const count = 200
    const positions = new Float32Array(count * 3)
    for(let i=0;i<count;i++){
      positions[i*3+0] = (Math.random()-0.5) * 400
      positions[i*3+1] = (Math.random()-0.5) * 200
      positions[i*3+2] = (Math.random()-0.5) * 400
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({ color: 0xffdca3, size: 2, transparent:true, opacity })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const onResize = ()=>{
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let rafId
    const animate = ()=>{
      points.rotation.y += 0.0008
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    animate()

    return ()=>{
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  },[opacity])

  return <div ref={ref} style={{position:'absolute', inset:0, zIndex:0, pointerEvents:'none'}} />
}
