import React from 'react';

import { theme, darkMode, lightMode } from '../styles/theme';

type DarkModeActionType = 'DARK_MODE_OFF' | 'DARK_MODE_ON';
type DarkModeAction = {
  type: DarkModeActionType;
};
type DarkModeDispatch = (action: DarkModeAction) => void;
type DarkModeState = any;
type DarkModeProviderProps = { children: React.ReactNode };

const INITIAL_THEME_STATE = {
  ...theme,
  mode: lightMode,
};

const DarkModeStateContext = React.createContext<DarkModeState | undefined>(
  undefined,
);
const DarkModeDispatchContext = React.createContext<
  DarkModeDispatch | undefined
>(undefined);

function darkModeReducer(state: DarkModeState, action: DarkModeAction) {
  console.log(action.type);

  switch (action.type) {
    case 'DARK_MODE_OFF':
      return { ...theme, mode: lightMode };
    case 'DARK_MODE_ON':
      return { ...theme, mode: darkMode };
    default: {
      throw Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [state, dispatch] = React.useReducer(
    darkModeReducer,
    INITIAL_THEME_STATE,
  );

  return (
    <DarkModeStateContext.Provider value={state}>
      <DarkModeDispatchContext.Provider value={dispatch}>
        {children}
      </DarkModeDispatchContext.Provider>
    </DarkModeStateContext.Provider>
  );
}

function useDarkModeState() {
  const context = React.useContext(DarkModeStateContext);
  if (context === undefined) {
    throw Error('useDarkModeState must be used within a DarkModeProvider');
  }
  return context;
}

function useDarkModeDispatch() {
  const context = React.useContext(DarkModeDispatchContext);
  if (context === undefined) {
    throw Error('useDarkModeDispatch must be used within a DarkModeProvider');
  }
  return context;
}

export { DarkModeProvider, useDarkModeState, useDarkModeDispatch };
