import React from 'react'
import { CursorType } from '../reducers/cursorReducer'
import Container from './Container'

export default function SubmitButton({value = 'Submit', onClick, style}) {
  return (
    <Container cursorType={CursorType.pointer} className='submit center' onClick={onClick} style={style}>
      {value}
    </Container>
  )
}
