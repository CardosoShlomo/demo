import React, { useEffect, useRef } from 'react'
import store from '../store';
import './cursor.css';

export default function Cursor({index, gap}) {

  const cursor = useRef();
  const cursorData = useRef();
  const previousData = useRef();

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const animation = useRef();

  const rectRef = useRef({
    left: 0,
    top: 0,
    width: 12 + gap * 2,
    height: 12 + gap * 2,
  });
  const radiusValues = useRef([]);
  
  const fromTo = (from, to) => (to - from) / (gap * 4);
  const animate = () => {

    if (cursorData.current) {
      for (const key in rectRef.current) {
        rectRef.current[key] += fromTo(rectRef.current[key], cursorData.current.rect[key]);
      }
    } else {
      const baseRect = {
        left: mouseX.current - 5 - gap,
        top: mouseY.current - 5 - gap,
        width: 12 + gap * 2,
        height: 12 + gap * 2,
      }
      for (const key in rectRef.current) {
        rectRef.current[key] += fromTo(rectRef.current[key], baseRect[key]);
      }
    }

    for (const key in rectRef.current) {
      cursor.current.style[key] = rectRef.current[key] + 'px';
    }
    
    let radiusString = '';
    if (cursorData.current) {
      const obj = cursorData.current.borderRadius;
      obj.values.forEach((e, i) => {
        if (!radiusValues.current[i]) radiusValues.current[i] = 1;
        radiusValues.current[i] += (e - radiusValues.current[i]) / 10;
        radiusString += radiusValues.current[i] + obj.symbols[i] + ' ';
      });
    } else if (previousData.current) {
      const obj = previousData.current.borderRadius;
      let count = 0;
      obj?.symbols.forEach((e, i) => {
        radiusValues.current[i] += (0 - radiusValues.current[i]) / 15;
        radiusString += radiusValues.current[i] + e + ' ';
        if (Math.round(radiusValues.current[i]) == 0) count++;
      });
      if (count == radiusValues.current.length) previousData.current = [];
    }
    
    cursor.current.style.borderRadius = radiusString;
    
    animation.current = requestAnimationFrame(animate);
  };

  const inside = useRef(false);
  
  useEffect(() => {
    const mouseEnterEvent = e => {
      if (!inside.current) {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
        rectRef.current.left = e.clientX;
        rectRef.current.top = e.clientY;
        cursor.current.style.left = e.clientX + 'px';
        cursor.current.style.top = e.clientY + 'px';
        cursor.current.style.opacity = 1;
        animate();
      }
      inside.current = true;
    }
    const mouseMoveEvent = e => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    }
    const mouseLeaveEvent = () => {
      inside.current = false;
      cursor.current.style.opacity = 0;
      cancelAnimationFrame(animation.current);
    }

    document.addEventListener('mouseenter', mouseEnterEvent);
    document.addEventListener('mousemove', mouseMoveEvent);
    document.addEventListener('mouseleave', mouseLeaveEvent);

    const unsubscribe = store.subscribe(() => {
      previousData.current = cursorData.current;
      cursorData.current = store.getState().cursorReducer.data[index];
      if (store.getState().cursorReducer.data.length > index - 1) {
        cursor.current.style.opacity = 1;
      } else {
        cursor.current.style.opacity = 0;
      }
    });

    return () => {
      cancelAnimationFrame(animation.current);
      
      document.removeEventListener('mouseenter', mouseEnterEvent);
      document.removeEventListener('mousemove', mouseMoveEvent);
      document.removeEventListener('mouseleave', mouseLeaveEvent);

      unsubscribe();
    }
  }, []);

  return (
    <div ref={cursor} className='cursor' style={{
      background: index%2 == 1 ? '#fff' : 'linear-gradient(45deg, #3B4371, #F3904F)',
      zIndex: -gap,
    }}></div>
  );
}
