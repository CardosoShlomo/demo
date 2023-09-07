import React, { useRef } from 'react'
import Container from './Container'
import { CursorType } from '../reducers/cursorReducer'
import '../stylesheets/form.css'

export const TextInputType = {
  text: 'text',
  password: 'password',
  email: 'email',
}

export default function TextInputField({type = TextInputType.text, placeholder}) {
  const inputRef = useRef();

  return (
    <Container cursorType={CursorType.text} className={'input'} onClick={() => inputRef.current.focus()}>
      <input ref={inputRef} type={type} placeholder={placeholder}></input>
    </Container>
  )
}
