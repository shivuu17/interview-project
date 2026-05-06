import React from 'react'

const items = [
  {id:'hero', label:'Home'},
  {id:'why', label:'Why'},
  {id:'retail', label:'Retail'},
  {id:'luxury', label:'Luxury'},
  {id:'dining', label:'Dining'},
  {id:'attractions', label:'Attractions'},
]

export default function ScrollNav(){
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {items.map(i=> (
        <button key={i.id} onClick={()=>document.getElementById(i.id)?.scrollIntoView({behavior:'smooth'})} className="glass px-3 py-2 rounded text-xs">{i.label}</button>
      ))}
    </div>
  )
}
