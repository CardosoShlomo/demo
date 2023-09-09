import React from 'react'
import Container from '../../../components/Container'

export default function InnerButton({isHovered, onClick, children}) {
  return (
    <Container className={'center'} style={{
      width: 30,
      borderRadius: 5,
      opacity: isHovered ? 1 : 0,
      transition: 'opacity .2s',
    }} onClick={onClick}>{children}</Container>
  )
}