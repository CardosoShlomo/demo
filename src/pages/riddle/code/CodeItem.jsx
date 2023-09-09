import React, { useState } from 'react'
import Container from '../../../components/Container'
import { addCodeItemAction, removeCodeItemAction } from '../../../reducers/codeReducer';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useSelector } from 'react-redux';
import DropDownSelector from './DropDownSelector';
import InnerButton from './InnerButton';
import InnerLine from './InnerLine';

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
      {selectedPartId === item.id && <DropDownSelector/>}
    </Container>
  )
}
