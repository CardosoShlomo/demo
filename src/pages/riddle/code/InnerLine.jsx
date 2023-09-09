import React from 'react'
import InnerLineWord from './InnerLineWord';

export default function InnerLine({isHovered, item}) {

  return (
    <div className='center' style={{
      width: '100%',
      justifyContent: 'start',
    }}>
      {item.line.map((e, i) => <InnerLineWord key={i + e} item={item} word={e} i={i} isHovered={isHovered}/>)}
    </div>
  )
}