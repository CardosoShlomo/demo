import React from 'react'
import { useSelector } from "react-redux";
import { selectCodePartAction } from "../../../reducers/codeReducer";
import Container from '../../../components/Container';
import Word from './Word';
import KeyWord from './words';

export default function InnerLineWord({word, item, i, isHovered}) {

  const selectedPart = useSelector(state => state.codeReducer.selectedPart);

  const selected = selectedPart.itemId == item?.id && selectedPart.index == i;

  return (
    <Container delay={200} style={{
      background: selected ? '#0009' : isHovered ? '#0001' : 'transparent',
      borderRadius: 100,
      margin: 5,
      padding: selected || isHovered ? word  == '' ? 15 : 10 : 0,
      transition: 'background .5s, padding .2s',
    }} onClick={() => {
      selectCodePartAction(selected ? null : item.id, i);
    }}>
      <Word color={word instanceof KeyWord ? word.color : null}>{word instanceof KeyWord ? word.word : word}</Word>
    </Container>
  )
}