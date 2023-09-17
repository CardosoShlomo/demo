import React, { useState } from 'react'
import Container from '../../../components/Container'
import { addCodeItemAction, lvlDownCodeItemAction, lvlUpCodeItemAction, removeCodeItemAction, updateCodeItemAction } from '../../../reducers/codeReducer';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useSelector } from 'react-redux';
import DropDownSelector from './DropDownSelector';
import InnerButton from './InnerButton';
import InnerLine from './InnerLine';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

export default function CodeItem({index, item}) {

  const [isHovered, setIsHovered] = useState(false)

  const selectedPart = useSelector(state => state.codeReducer.selectedPart)

  return (
    <Container style={{
      width: '100%',
      borderRadius: 10,
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    triggerCursorUpdate={selectedPart.itemId === item.id && selectedPart}>
      <div className='row' style={{
        justifyContent: 'start',
        width: '100%',
        height: 40,
      }}>
        <InnerButton isHovered={isHovered && item.line.length > 0 && item.line[0].isContainer} onClick={() => {}}><KeyboardArrowDownRoundedIcon fontSize='25px'/></InnerButton>
        <InnerButton isHovered={isHovered && item.lvl > 0} onClick={() => lvlDownCodeItemAction(item)}><KeyboardDoubleArrowLeftRoundedIcon fontSize='25px'/></InnerButton>
        <div style={{width: 30 * item.lvl + 'px'}}></div>
        <InnerLine isHovered={isHovered} item={item} />
        <InnerButton isHovered={isHovered} onClick={() => lvlUpCodeItemAction(item)}><KeyboardDoubleArrowRightRoundedIcon fontSize='25px'/></InnerButton>
        <InnerButton isHovered={isHovered} onClick={() => addCodeItemAction(index + 1, item.lvl)}><AddRoundedIcon fontSize='25px'/></InnerButton>
        <InnerButton isHovered={isHovered} onClick={() => removeCodeItemAction(item.id)}><DeleteOutlineRoundedIcon fontSize='25px'/></InnerButton>
      </div>
      {selectedPart.itemId === item.id && <DropDownSelector/>}
    </Container>
  )
}
