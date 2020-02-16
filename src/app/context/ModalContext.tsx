import React from 'react';

// import { INITIAL_MODAL_STATE } from '../components/Modal/NewModal';

// import { IModalState } from '../common/types';
import { ModalActionType } from '../common/enums';

type Action = { type: ModalActionType };
type Dispatch = (action: Action) => void;
type State = { open: boolean };
type ModalProviderProps = { children: React.ReactNode };

const INITIAL_MODAL_STATE: State = {
  open: true,
};

const ModalStateContext = React.createContext<State | undefined>(undefined);
const ModalDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

function modalReducer(state: State, action: Action) {
  switch (action.type) {
    case ModalActionType.Open:
      return { open: true };
    case ModalActionType.Close:
      return { open: false };
    default: {
      throw Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ModalProvider({ children }: ModalProviderProps) {
  const [state, dispatch] = React.useReducer(modalReducer, INITIAL_MODAL_STATE);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw Error('useModalState must be used within a ModalProvider');
  }
  return context;
}

function useModalDispatch() {
  const context = React.useContext(ModalDispatchContext);
  if (context === undefined) {
    throw Error('useModalDispatch must be used within a ModalProvider');
  }
  return context;
}
// const ModalContext = React.createContext<IModalState>(INITIAL_MODAL_STATE);

export { ModalProvider, useModalState, useModalDispatch };
