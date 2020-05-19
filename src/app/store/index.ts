import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector as useRRSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import { filterReducer } from './filter/reducers';
import uiReducer from './ui';
import movesReducer from './moves';

const rootReducer = combineReducers({
  filter: filterReducer,
  moves: movesReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// set up so don't have to declare type every time
export const useSelector: TypedUseSelectorHook<RootState> = useRRSelector;
export * from 'react-redux';

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

export default createStore;
