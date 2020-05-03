import React from 'react';

const UseAddMoveModeContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

function AddMoveModeProvider({ children }: { children: React.ReactNode }) {
  const useAddMoveMode = React.useState(false);

  return (
    <UseAddMoveModeContext.Provider value={useAddMoveMode}>
      {children}
    </UseAddMoveModeContext.Provider>
  );
}

function useAddMoveMode() {
  const context = React.useContext(UseAddMoveModeContext);
  if (context === undefined) {
    throw Error(
      'useaddMoveModeState must be used within a addMoveModeProvider',
    );
  }
  return context;
}

export { AddMoveModeProvider, useAddMoveMode };
