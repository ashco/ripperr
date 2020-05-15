import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector as useRRSelector,
  useDispatch,
  TypedUseSelectorHook,
} from 'react-redux';

import { filterReducer } from './filter/reducers';
// import modalReducer from './modal';
// import themeReducer from './theme';
import uiReducer from './ui';

const rootReducer = combineReducers({
  filter: filterReducer,
  // modal: modalReducer,
  ui: uiReducer,
  // theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// set up so don't have to declare type every time
export const useSelector: TypedUseSelectorHook<RootState> = useRRSelector;
export { useDispatch };

export default () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};
