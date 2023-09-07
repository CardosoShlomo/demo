import React, { useEffect, useState } from 'react'
import Container from './Container'
import store from '../store';
import CodeItem from './CodeItem';

export default function Code() {

  const [items, setItems] = useState(store.getState().codeReducer.items);

  useEffect(() => store.subscribe(() => {
    setItems(store.getState().codeReducer.items);
  }), []);

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
