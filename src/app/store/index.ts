﻿import { combineReducers } from 'redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import {
  useSelector as useRRSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import filterReducer from './filter';
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

const createStore = (state?: any): EnhancedStore<any> => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: state,
  });

  return store;
};

export default createStore;
