import React from 'react'
import { selectCodePartAction, updateCodeItemAction } from '../../../reducers/codeReducer';
import Word from './Word';
import Container from '../../../components/Container';
import store from '../../../store';

export default function DropDownSelectorWord({word}) {

  function checkIfNotLast(index) {
    switch (word) {
      case 'else':
      case 'break':
      case 'continue':
      case 'back':
      case 'forward':
      case 'one':
      case 'zero':
      case 'border':
        return false;
      case 'if':
      case 'while':
      case 'is':
      case 'not':
      case '==':
      case '!=':
      case '>=':
      case '<=':
      case '>':
      case '<':
      case '=':
      case '+':
      case '-':
      case '*':
      case '+=':
      case '-=':
      case '*=':
      case 'go':
      case 'move':
      case 'up':
      case 'down':
      case 'left':
      case 'right':
      case 'top':
      case 'bottom':
    }
    return true;
  }

  return (
    <Container style={{
      borderRadius: 100,
      margin: 5,
      padding: 10,
    }} onClick={() => {
      const code = store.getState().codeReducer;
      const selectedPart = code.selectedPart;
      const item = code.items.find(e => e.id == selectedPart.itemId);

      const newLine = [...item.line.slice(0, selectedPart.partIndex), word];
      
      const isNotLast = checkIfNotLast(selectedPart.partIndex);

      if (isNotLast) {
        newLine.push('');
        selectCodePartAction(selectedPart.itemId, selectedPart.partIndex + 1);
      } else {
        selectCodePartAction();
      }

      updateCodeItemAction({...item, line: newLine});
    }}>
      <Word>{word}</Word>
    </Container>
  )
}
