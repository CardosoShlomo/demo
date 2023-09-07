import React from 'react'
import Container from '../components/Container'
import TextInputField, { TextInputType } from '../components/TextInputField';
import SubmitButton from '../components/SubmitButton';
import Cursors from '../cursor/Cursors';

export default function LogIn() {
  
  return (
    <div className='center expanded'>
      <Cursors>{2}</Cursors>
      <Container className='form column'>
        <h1>Login</h1>
        <br/>
        <TextInputField placeholder={'username'} />
        <TextInputField type={TextInputType.password} placeholder={'password'} />
        <SubmitButton />
        <br/><br/><br/>
      </Container>
    </div>
  )
}
