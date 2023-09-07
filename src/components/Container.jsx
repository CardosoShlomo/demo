import React, {useEffect, useRef, useState} from 'react'
import { CursorType, addCursorDataAction, removeCursorDataAction, updateCursorDataAction } from '../reducers/cursorReducer';
import store from '../store';

export default function Container({className, style, cursorType = CursorType.default, cursorColor, delay = 0, triggerCursorUpdate, children, ...events}) {
  const container = useRef();

  const [color, setColor] = useState('inherit');

  const timer = useRef(null);

  const cursorIndex = useRef();
  useEffect(() => {
    if (cursorIndex.current) {
      updateCursorDataAction({
        index: cursorIndex.current,
        rect: container.current.getBoundingClientRect(),
        borderRadius: window.getComputedStyle(container.current).borderRadius,
        color: cursorColor,
        cursorType: cursorType,
      });
    }
  }, [triggerCursorUpdate]);

  return (
    <div
    ref={container}
    className={className ? className + ' ' + color : color}
    style={style}
    onClick={events?.onClick}
    onMouseEnter={() => {
      timer.current = setTimeout(() => {
        addCursorDataAction({
          rect: container.current.getBoundingClientRect(),
          borderRadius: window.getComputedStyle(container.current).borderRadius,
          color: cursorColor,
          cursorType: cursorType,
        });
        cursorIndex.current = store.getState().cursorReducer.data.length - 1;
        setColor(store.getState().cursorReducer.data.length % 2 == 0 ? 'black' : 'white');
        timer.current = null;
      }, delay);
      events?.onMouseEnter?.();
    }}
    onMouseLeave={() => {
      cursorIndex.current = null;
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      } else {
        removeCursorDataAction();
        setColor('inherit');
      }
      events?.onMouseLeave?.();
    }}
    >{children}</div>
  )
}
