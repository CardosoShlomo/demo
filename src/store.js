import { configureStore } from '@reduxjs/toolkit';
import cursorReducer from './reducers/cursorReducer';
import codeReducer from './reducers/codeReducer';

const store = configureStore({
  reducer: { cursorReducer, codeReducer },
});

export default store;
