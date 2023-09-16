import React from 'react'
import { useSelector } from 'react-redux'
import DropDownSelectorWord from './DropDownSelectorWord'
import KeyWord from './words'

export default function DropDownSelector() {

  const selectedPart = useSelector(state => state.codeReducer.selectedPart)
  
  // const items = useSelector(state => state.codeReducer.items)
  // const item = items.find(e => e.id == selectedPart.itemId)

  const options = Object.values(KeyWord).filter(e => e.isAnOption({
    partIndex: selectedPart.partIndex,
  }))

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      padding: 5,
      overflow: 'auto',
    }}>
      {options.map(keyword => <DropDownSelectorWord key={keyword.word} keyword={keyword}/>)}
    </div>
  )
}


