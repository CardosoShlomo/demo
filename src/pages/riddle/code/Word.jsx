import React from 'react'

export default function Word({color, children}) {

  return (
    <div style={{color: color}}>{children}</div>
  )
}
