import React, { useEffect, useRef, useState } from 'react'
import Container from './Container'
import { addCodeItemAction, removeCodeItemAction, selectCodePartAction } from '../reducers/codeReducer';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { usePopper } from 'react-popper';
import { useSelector } from 'react-redux';

export default function CodeItem({index, item}) {

  const [isHovered, setIsHovered] = useState(false);

  const selectedPartId = useSelector(state => state.codeReducer.selectedPart.itemId);

  return (
    <Container style={{
      width: '100%',
      borderRadius: 10,
      alignItems: 'start',
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    triggerCursorUpdate={selectedPartId === item.id}>
      <div className='row' style={{
        justifyContent: 'start',
        width: '100%',
        height: 40,
      }}>
        <InnerButton isHovered={isHovered} onClick={() => {}}><KeyboardArrowDownRoundedIcon fontSize='25px'/></InnerButton>
        <div style={{width: 30 * item.lvl}}></div>
        <InnerLine isHovered={isHovered} item={item} />
        <InnerButton isHovered={isHovered} onClick={() => addCodeItemAction(index + 1, item.lvl)}><AddRoundedIcon fontSize='25px'/></InnerButton>
        <InnerButton isHovered={isHovered} onClick={() => removeCodeItemAction(item.id)}><DeleteOutlineRoundedIcon fontSize='25px'/></InnerButton>
      </div>
      {selectedPartId === item.id && <div style={{//todo: update cursor
        width: '100%',
        height: '200px',
        padding: 5,
        overflow: 'auto',
      }}>
        
      </div>}
    </Container>
  )
}

function InnerButton({isHovered, onClick, children}) {
  return (
    <Container className={'center'} style={{
      width: 30,
      borderRadius: 5,
      opacity: isHovered ? 1 : 0,
      transition: 'opacity .2s',
    }} onClick={onClick}>{children}</Container>
  )
}

function InnerLine({isHovered, item}) {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    setParts(item.line ? item.line.split(' ') : []);
  }, []);

  return (
    <div className='center' style={{
      width: '100%',
      justifyContent: 'start',
    }}>
      {parts.map((e, i) => <InnerLinePart key={i + e} itemId={item.id} word={e} i={i} isHovered={isHovered}/>)}
    </div>
  )
}

function InnerLinePart({word, itemId, i, isHovered}) {

  let color;

  switch (word) {
    case 'if':
    case 'else':
    case 'while':
    case 'break':
    case 'continue':
      color = 'orange';
      break;
    case 'is':
    case 'not':
    case '==':
    case '!=':
    case '>=':
    case '<=':
    case '>':
    case '<':
    case '=':
    case '+=':
    case '-=':
    case '*=':
      color = 'cornflowerblue';
      break;
    case 'go':
    case 'move':
    case 'up':
    case 'down':
    case 'left':
    case 'right':
    case 'back':
    case 'forward':
    case 'one':
    case 'zero':
    case 'border':
    case 'top':
    case 'bottom':
      color = 'darkseagreen';
  }

  const selectedPart = useSelector(state => state.codeReducer.selectedPart);

  const selected = selectedPart.itemId == itemId && selectedPart.linePartIndex == i;

  return (
    <Container delay={200} style={{
      background: selected ? '#0009' : isHovered ? '#0001' : 'transparent',
      borderRadius: 100,
      margin: 5,
      padding: selected || isHovered ? 10 : 0,
      color: color,
      transition: 'background .5s, padding .2s',
    }} onClick={() => {selectCodePartAction(selected ? null : itemId, i)}}>
        {word}
    </Container>
  )
}

function CodePartMenu({space = 0}) {

  return (
    <div className='column' style={{
      position: 'relative',
      left: space * 20,
      top: 5,
      width: 200,
      height: 400,
      background: '#0009',
    }}>
      <button>while</button>
      <button>if</button>
      <button>else</button>
    </div>
  )
}

