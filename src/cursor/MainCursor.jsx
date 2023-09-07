import React, { useRef, useEffect } from 'react';
import store from '../store';

export default function MainCursor() {
  const cursor = useRef();

  useEffect(() => {
    const style = cursor.current.style;
    const mouseEnterEvent = () => {
      style.opacity = 1;
    }
    const mouseMoveEvent = e => {
      style.left = e.clientX - 5 + 'px';
      style.top = e.clientY - 5 + 'px';
    };
    const mouseLeaveEvent = () => {
      style.opacity = 0;
    }

    document.addEventListener('mouseenter', mouseEnterEvent);
    document.addEventListener('mousemove', mouseMoveEvent);
    document.addEventListener('mouseleave', mouseLeaveEvent);

    const setCursorColor = () => {
      style.background = store.getState().cursorReducer.amount%2 != 0 ? '#0003' : '#F3904F44';
    }
    setCursorColor();
    const unsubscribe = store.subscribe(setCursorColor);
    return () => {
      document.removeEventListener('mouseenter', mouseEnterEvent);
      document.removeEventListener('mousemove', mouseMoveEvent);
      document.removeEventListener('mouseleave', mouseLeaveEvent);
      
      unsubscribe();
    }
  }, []);

  return (
    <div ref={cursor} className='cursor mainCursor'></div>
  )
}
