import React from 'react'
import Container from '../components/Container'
import TextInputField, { TextInputType } from '../components/TextInputField';
import SubmitButton from '../components/SubmitButton';
import Cursors from '../cursor/Cursors';

export default function SignUp() {

  return (
    <div className='center expanded'>
      <Cursors>{2}</Cursors>
      <Container className='form column'>
        <h1>Sign Up</h1>
        <br/>
        <TextInputField type={TextInputType.email} placeholder={'email'} />
        <TextInputField placeholder={'username'} />
        <TextInputField type={TextInputType.password} placeholder={'password'} />
        <SubmitButton />
        <br/><br/><br/>
      </Container>
    </div>
  )
}
