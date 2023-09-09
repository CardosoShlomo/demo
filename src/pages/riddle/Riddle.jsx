import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Cursors from '../../cursor/Cursors';
import Code from './code/Code';

export default function Riddle() {

  const [direction, setDirection] = useState('row');

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {

    const onResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      const aspectRatio = window.innerWidth / window.innerHeight;
      setDirection(aspectRatio > 1 ? 'row' : 'column');
    }
    onResize();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className={`expaned ${direction}`} style={{
      width: width - 20,
      height: height - 20,
      boxSizing: 'border-box',
      margin: 10,
    }}>
      <Cursors>{3}</Cursors>
      <Container className='expanded column' style={{
        borderRadius: 20,
      }}>
        
      </Container>
      <Code/>
    </div>
  )
}
