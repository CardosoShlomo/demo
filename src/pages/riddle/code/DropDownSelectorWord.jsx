import React from 'react'
import { selectCodePartAction, updateCodeItemAction } from '../../../reducers/codeReducer';
import Word from './Word';
import Container from '../../../components/Container';
import store from '../../../store';

export default function DropDownSelectorWord({keyword}) {

  return (
    <Container style={{
      borderRadius: 100,
      margin: 5,
      padding: 10,
    }} onClick={() => {
      const code = store.getState().codeReducer;
      const selectedPart = code.selectedPart;
      const item = code.items.find(e => e.id == selectedPart.itemId);

      const newLine = [...item.line.slice(0, selectedPart.partIndex), keyword];

      if (keyword.isLast) {
        selectCodePartAction();
      } else {
        newLine.push('');
        selectCodePartAction(selectedPart.itemId, selectedPart.partIndex + 1);
      }

      updateCodeItemAction({...item, line: newLine});
    }}>
      <Word color={keyword.color}>{keyword.word}</Word>
    </Container>
  )
}
