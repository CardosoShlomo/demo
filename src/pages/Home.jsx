import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import '../stylesheets/form.css';
import '../stylesheets/layout.css';
import SubmitButton from '../components/SubmitButton';
import Cursors from '../cursor/Cursors';

export default function Home() {

  const nav = useNavigate();
  
  return (
    <div className='center expanded'>
      <Cursors>{2}</Cursors>
      <Container style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        padding: 5,
      }}>
        <div style={{width: 15}}/>
        <div className='expanded'>I.E.P.O.K</div>
        <SubmitButton style={{margin: 0}} value='login' onClick={() => nav('/login')} />
        <SubmitButton style={{margin: 0}} value='signup' onClick={() => nav('/signup')} />
      </Container>
      <Container className='form column'>
        <h1>Welcome</h1>
        <br/>
        <SubmitButton value='riddle' onClick={() => nav('/riddle')} />
        <br/><br/><br/>
      </Container>
    </div>
  )
}
