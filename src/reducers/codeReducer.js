import KeyWord from "../pages/riddle/code/words";
import store from "../store";
import { produce } from "immer";

export default function codeReducer(state = {
  items: [
    {id: 1, lvl: 0, line: [KeyWord.if, KeyWord.up, KeyWord.is, KeyWord.border]},
    {id: 2, lvl: 1, line: [KeyWord.goLeft]},
    {id: 3, lvl: 0, line: [KeyWord.else]},
    {id: 4, lvl: 1, line: [KeyWord.goUp]},
    {id: 5, lvl: 0, line: ['counter', KeyWord.becomes, '0']},
    {id: 6, lvl: 0, line: [KeyWord.while, KeyWord.up, KeyWord.isNot, KeyWord.zero]},
    {id: 7, lvl: 1, line: [KeyWord.if, KeyWord.up, KeyWord.is, KeyWord.one]},
    {id: 8, lvl: 2, line: ['counter', KeyWord.add, '1']},
    {id: 9, lvl: 0, line: [KeyWord.if, KeyWord.up, KeyWord.is, KeyWord.border]},
    {id: 10, lvl: 1, line: [KeyWord.goLeft]},
    {id: 11, lvl: 0, line: [KeyWord.else]},
    {id: 12, lvl: 1, line: [KeyWord.goUp]},
    {id: 13, lvl: 0, line: ['counter', KeyWord.becomes, '0']},
    {id: 14, lvl: 0, line: [KeyWord.while, KeyWord.up, KeyWord.isNot, KeyWord.zero]},
    {id: 15, lvl: 1, line: [KeyWord.if, KeyWord.up, KeyWord.is, KeyWord.one]},
    {id: 16, lvl: 2, line: ['counter', KeyWord.add, '1']},
    {id: 17, lvl: 2, line: [KeyWord.break]},
  ],
  selectedPart: {
    itemId: null,
    index: null,
  }
}, {type, payload}) {
  switch (type) {
    case 'selectPart': {
      return produce(state, draftState => {
        draftState.selectedPart = payload.part;
      });
    }
    case 'addCodeItem': {
      return produce(state, draftState => {
        draftState.items.splice(payload.index, 0, payload.item);
      });
    }
    case 'updateCodeItem': {
      return produce(state, draftState => {
        const index = state.items.map(e => e.id).indexOf(payload.item.id);
        draftState.items.splice(index, 1, payload.item);
      });
    }
    case 'removeCodeItem': {
      return produce(state, draftState => {
        const index = state.items.map(e => e.id).indexOf(payload.id);
        draftState.items.splice(index, 1);
      });
    }
    default: return state;
  }
}

export const selectCodePartAction = (itemId, index) => {
  store.dispatch({
    type: 'selectPart',
    payload: {part: {
      itemId,
      index,
    }}
  })
}

export const addCodeItemAction = (index, lvl) => {
  store.dispatch({
    type: 'addCodeItem',
    payload: {index, item: {
      id: Date.now(),
      lvl,
      line: [''],
    }},
  });
}

export const updateCodeItemAction = item => {
  store.dispatch({
    type: 'updateCodeItem',
    payload: {item},
  });
}

export const removeCodeItemAction = id => {
  store.dispatch({
    type: 'removeCodeItem',
    payload: {id},
  });
}

export const lvlDownCodeItemAction = item => {
  if (item.lvl > 0) {
    updateCodeItemAction({...item, lvl: item.lvl - 1})
  }
}

export const lvlUpCodeItemAction = item => {
  const items = store.getState().codeReducer.items

  const lastContainer = items.slice(0, items.indexOf(item)).reverse().find(e => e.line.length > 0 && e.line[0].isContainer)
  
  if (lastContainer) {
    let maxTabs = lastContainer.lvl + 1
    if (item.line.length != 0 && item.line[0] == KeyWord.else) {
      maxTabs--
    }
    if (item.lvl < maxTabs) {
      updateCodeItemAction({...item, lvl: item.lvl + 1})
      if (item.line.length > 0 && (item.line[0] == KeyWord.if || item.line[0] == KeyWord.while)) {
        for (let i = items.indexOf(item) + 1; i < items.length; i++) {
          const nextItem = items[i]
          if (nextItem.line.length == 0) continue
          if (nextItem.lvl > item.lvl) {
            updateCodeItemAction({...nextItem, lvl: nextItem.lvl + 1})
          } else if (nextItem.lvl == item.lvl && nextItem.line[0] == KeyWord.else) {
            updateCodeItemAction({...nextItem, lvl: nextItem.lvl + 1})
          } else {
            break
          }
        }
      }
    }
  }
}
