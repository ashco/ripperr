import React from 'react';

// export type ThemeModeActionType = 'LIGHT_MODE' | 'DARK_MODE';
// type ThemeModeAction = {
//   type: ThemeModeActionType;
// };
// type ThemeModeState = any;
// type ThemeModeDispatch = (action: ThemeModeAction) => void;
// type ThemeModeProviderProps = { children: React.ReactNode };

// const INITIAL_THEME_STATE = {
//   ...theme,
//   mode: lightMode,
// };

const PointerEventsStateContext = React.createContext<boolean | undefined>(
  undefined,
);
const PointerEventsDispatchContext = React.createContext<
  ((state: boolean) => void) | undefined
>(undefined);
// const UsePointerEventsContext = React.createContext();

// function themeModeReducer(state: ThemeModeState, action: ThemeModeAction) {
//   console.log(action.type);

//   switch (action.type) {
//     case 'LIGHT_MODE':
//       localStorage.setItem('themeMode', 'LIGHT_MODE');
//       return { ...theme, mode: lightMode };
//     case 'DARK_MODE':
//       localStorage.setItem('themeMode', 'DARK_MODE');
//       return { ...theme, mode: darkMode };
//     default: {
//       throw Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

// // function ThemeModeProvider({ children }: ThemeModeProviderProps) {
// //   const [isThemeMode, setThemeMode] = React.useState(false);

// //   function createThemeModeObj() {
// //     return { ...theme, mode: isThemeMode ? darkMode : lightMode };
// //   }

// //   const themeObj = createThemeModeObj();

// //   return (
// //     <ThemeModeStateContext.Provider value={themeObj}>
// //       <ThemeModeDispatchContext.Provider value={themeModeReducer}>
// //         {children}
// //       </ThemeModeDispatchContext.Provider>
// //     </ThemeModeStateContext.Provider>
// //   );
// // }
function PointerEventsProvider({ children }: { children: React.ReactNode }) {
  const [pointerEvents, setPointerEvents] = React.useState(true);

  return (
    <PointerEventsStateContext.Provider value={pointerEvents}>
      <PointerEventsDispatchContext.Provider value={setPointerEvents}>
        {children}
      </PointerEventsDispatchContext.Provider>
    </PointerEventsStateContext.Provider>
  );
}

function usePointerEvents() {
  const context = React.useContext(PointerEventsStateContext);
  if (context === undefined) {
    throw Error(
      'usePointerEventsState must be used within a PointerEventsProvider',
    );
  }
  return context;
}

function useSetPointerEvents() {
  const context = React.useContext(PointerEventsDispatchContext);
  if (context === undefined) {
    throw Error(
      'usePointerEventsDispatch must be used within a PointerEventsProvider',
    );
  }
  return context;
}

export { PointerEventsProvider, usePointerEvents, useSetPointerEvents };
