import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  useSelector as useRRSelector,
  useDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
// import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import { themeModeReducer } from './themeMode/reducers';
// import { chatReducer } from './chat/reducers';

const rootReducer = combineReducers({
  themeMode: themeModeReducer,
  // chat: chatReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

// set up so don't have to declare type every time
export const useSelector: TypedUseSelectorHook<AppState> = useRRSelector;
export { useDispatch };

export default function configureStore() {
  // const middlewares = [thunkMiddleware];
  // const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    // composeWithDevTools(middleWareEnhancer)
    composeWithDevTools(),
  );

  return store;
}
