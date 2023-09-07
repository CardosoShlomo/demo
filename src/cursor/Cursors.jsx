import React, { useEffect } from 'react'
import Cursor from './Cursor';
import './cursor.css';
import { setCursorAmountAction } from '../reducers/cursorReducer';
import MainCursor from './MainCursor';
import {BrowserView, MobileView} from 'react-device-detect';

export default function Cursors({children}) {

  useEffect(() => {
    setCursorAmountAction(children);
  }, []);

  return (
    <>
      <BrowserView>
        <MainCursor/>
        {Array.from({length: children}, (_, i) => <Cursor key={i} index={i} gap={children - i}/>)}
      </BrowserView>
      
      <MobileView>

      </MobileView>
    </>
  )
}
