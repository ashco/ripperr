import React from 'react';

import { theme, darkMode, lightMode } from '../styles/theme';

export type ThemeModeActionType = 'LIGHT_MODE' | 'DARK_MODE';
type ThemeModeAction = {
  type: ThemeModeActionType;
};
type ThemeModeState = any;
type ThemeModeDispatch = (action: ThemeModeAction) => void;
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

function themeModeReducer(state: ThemeModeState, action: ThemeModeAction) {
  console.log(action.type);

  switch (action.type) {
    case 'LIGHT_MODE':
      localStorage.setItem('themeMode', 'LIGHT_MODE');
      return { ...theme, mode: lightMode };
    case 'DARK_MODE':
      localStorage.setItem('themeMode', 'DARK_MODE');
      return { ...theme, mode: darkMode };
    default: {
      throw Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// function ThemeModeProvider({ children }: ThemeModeProviderProps) {
//   const [isThemeMode, setThemeMode] = React.useState(false);

//   function createThemeModeObj() {
//     return { ...theme, mode: isThemeMode ? darkMode : lightMode };
//   }

//   const themeObj = createThemeModeObj();

//   return (
//     <ThemeModeStateContext.Provider value={themeObj}>
//       <ThemeModeDispatchContext.Provider value={themeModeReducer}>
//         {children}
//       </ThemeModeDispatchContext.Provider>
//     </ThemeModeStateContext.Provider>
//   );
// }
function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [state, dispatch] = React.useReducer(
    themeModeReducer,
    INITIAL_THEME_STATE,
  );

  return (
    <ThemeModeStateContext.Provider value={state}>
      <ThemeModeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeModeDispatchContext.Provider>
    </ThemeModeStateContext.Provider>
  );
}

function useThemeModeState() {
  const context = React.useContext(ThemeModeStateContext);
  if (context === undefined) {
    throw Error('useThemeModeState must be used within a ThemeModeProvider');
  }
  return context;
}

function useThemeModeDispatch() {
  const context = React.useContext(ThemeModeDispatchContext);
  if (context === undefined) {
    throw Error('useThemeModeDispatch must be used within a ThemeModeProvider');
  }
  return context;
}

export { ThemeModeProvider, useThemeModeState, useThemeModeDispatch };
