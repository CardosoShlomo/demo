import React from 'react'
import Container from '../../../components/Container'
import CodeItem from './CodeItem';
import { useSelector } from 'react-redux';

export default function Code() {

  const items = useSelector(state => state.codeReducer.items);

  return (
    <Container className='expanded column' style={{
      borderRadius: 20,
      justifyContent: 'start',
      padding: 20,
      overflow: 'auto',
    }}>
      {items.map((e, i) => <CodeItem key={e.id} index={i} item={e}/>)}
    </Container>
  )
}
