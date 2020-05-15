import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector as useRRSelector,
  useDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
// import thunkMiddleware from "redux-thunk";

import { filterReducer } from './filter/reducers';
import modalReducer from './modal';
import themeReducer from './theme';
// import { themeReducer } from './theme/reducers';
// import { themeReducer } from './theme';
// import { modalSlice } from './modal';
// import { themeSlice } from './theme';

const rootReducer = combineReducers({
  filter: filterReducer,
  modal: modalReducer,
  theme: themeReducer,
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
