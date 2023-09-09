import React from 'react'
import { useSelector } from 'react-redux'
import Word from './Word';
import DropDownSelectorWord from './DropDownSelectorWord';

export default function DropDownSelector() {

  const items = useSelector(state => state.codeReducer.items);
  const selected = useSelector(state => state.codeReducer.selectedPart);

  const item = items.find(e => e.id == selected.itemId);

  const first = ['if', 'else', 'while', 'break', 'continue', 'go', 'move'];
  const operator = ['is', 'not', '==', '!=', '>=', '<=', '>', '<', '=', '+', '-', '*', '+=', '-=', '*=']
  const operand = ['up', 'down', 'left', 'right', 'back', 'forward', 'one', 'zero', 'border', 'top', 'bottom'];

  let options = [];

  switch (selected.partIndex) {
    case 0:
      options = first;
      break;
    case 1:
      options = operand;
      break;
    case 2:
      options = operator;
      break;
    case 3:
      options = operand;
      break;
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      padding: 5,
      overflow: 'auto',
    }}>
      {options.map(e => <DropDownSelectorWord key={e} word={e}/>)}
    </div>
  )
}


