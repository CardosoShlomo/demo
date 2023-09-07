import store from "../store";
import { produce } from "immer";

export const CursorType = {
  default: 'default',
  text: 'text',
  pointer: 'pointer',
  grab: 'grab',
  grabbing: 'grabbing',
}

export default function cursorReducer(state = {
  amount: 2,
  cursorType: undefined,
  data: [],
}, {type, payload}) {
  switch (type) {
    case 'setCursorAmount': {
      return produce(state, draftState => {
        draftState.amount = payload;
        draftState.data = [];
      });
    }
    case 'setCursorType': {
      return produce(state, draftState => {
        draftState.type = payload;
      });
    }
    case 'addCursorData': {
      return produce(state, draftState => {
        if (state.data.length < state.amount) {
          draftState.data.push(payload);
        }
      });
    }
    case 'updateCursorData': {
      return produce(state, draftState => {
        if (state.data[payload.index]) {
          draftState.data.splice(payload.index, 1, payload.newData);
        }
      });
    }
    case 'removeCursorData': {
      return produce(state, draftState => {
        draftState.data.pop();
      });
    }
    default: return state;
  }
}

export const setCursorAmountAction = amount => store.dispatch({
  type: 'setCursorAmount',
  payload: amount,
});

export const setCursorTypeAction = type => store.dispatch({
  type: 'setCursoType',
  payload: type,
});

export const addCursorDataAction = ({rect, borderRadius, cursorColor, cursorType}) => {
  const values = [];
  const symbols = [];
  borderRadius.split(' ').forEach(e => {
    let value = '';
    let symbol = '';
    for (let i = 0; i < e.length; i++) {
      const char = e[i];
      if (isNaN(char)) symbol += char;
      else value += char;
    }
    values.push(value);
    symbols.push(symbol);
  });
  store.dispatch({
    type: 'addCursorData',
    payload: {
      rect: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
      borderRadius: {
        values: values,
        symbols: symbols,
      },
      cursorColor,
      cursorType,
    },
  });
}

export const updateCursorDataAction = ({index, rect, borderRadius, cursorColor, cursorType}) => {
  const values = [];
  const symbols = [];
  borderRadius.split(' ').forEach(e => {
    let value = '';
    let symbol = '';
    for (let i = 0; i < e.length; i++) {
      const char = e[i];
      if (isNaN(char)) symbol += char;
      else value += char;
    }
    values.push(value);
    symbols.push(symbol);
  });
  store.dispatch({
    type: 'updateCursorData',
    payload: {
      index,
      newData: {
        rect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },
        borderRadius: {
          values: values,
          symbols: symbols,
        },
        cursorColor,
        cursorType,
      },
    },
  });
}

export const removeCursorDataAction = () => store.dispatch({
  type: 'removeCursorData',
});
