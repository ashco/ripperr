import React from 'react';

import { theme, darkMode, lightMode } from '../styles/theme';

type ThemeModeActionType = 'DARK_MODE_OFF' | 'DARK_MODE_ON';
type ThemeModeAction = {
  type: ThemeModeActionType;
};
type ThemeModeDispatch = (action: ThemeModeAction) => void;
type ThemeModeState = any;
type ThemeModeProviderProps = { children: React.ReactNode };

const INITIAL_THEME_STATE = {
  ...theme,
  mode: lightMode,
};

const ThemeModeStateContext = React.createContext<ThemeModeState | undefined>(
  undefined,
);
const ThemeModeDispatchContext = React.createContext<
  ThemeModeDispatch | undefined
>(undefined);

function darkModeReducer(state: ThemeModeState, action: ThemeModeAction) {
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

function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [isThemeMode, setThemeMode] = React.useState(false);

  function createThemeModeObj() {
    return { ...theme, mode: isThemeMode ? darkMode : lightMode };
  }

  function toggleThemeMode() {
    setThemeMode((mode) => !mode);
  }

  const themeObj = createThemeModeObj();

  return (
    <ThemeModeStateContext.Provider value={themeObj}>
      <ThemeModeDispatchContext.Provider value={toggleThemeMode}>
        {children}
      </ThemeModeDispatchContext.Provider>
    </ThemeModeStateContext.Provider>
  );
}
// function ThemeModeProvider({ children }: ThemeModeProviderProps) {
//   const [state, dispatch] = React.useReducer(
//     darkModeReducer,
//     INITIAL_THEME_STATE,
//   );

//   return (
//     <ThemeModeStateContext.Provider value={state}>
//       <ThemeModeDispatchContext.Provider value={dispatch}>
//         {children}
//       </ThemeModeDispatchContext.Provider>
//     </ThemeModeStateContext.Provider>
//   );
// }

function useThemeModeObj() {
  const context = React.useContext(ThemeModeStateContext);
  if (context === undefined) {
    throw Error('useThemeModeState must be used within a ThemeModeProvider');
  }
  return context;
}

function useThemeModeToggle() {
  const context = React.useContext(ThemeModeDispatchContext);
  if (context === undefined) {
    throw Error('useThemeModeDispatch must be used within a ThemeModeProvider');
  }
  return context;
}

export { ThemeModeProvider, useThemeModeObj, useThemeModeToggle };
