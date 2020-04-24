import React from 'react';

const UsePointerEventsContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

function PointerEventsProvider({ children }: { children: React.ReactNode }) {
  const usePointerEvents = React.useState(true);

  return (
    <UsePointerEventsContext.Provider value={usePointerEvents}>
      {children}
    </UsePointerEventsContext.Provider>
  );
}

function usePointerEvents() {
  const context = React.useContext(UsePointerEventsContext);
  if (context === undefined) {
    throw Error(
      'usePointerEventsState must be used within a PointerEventsProvider',
    );
  }
  return context;
}

export { PointerEventsProvider, usePointerEvents };
