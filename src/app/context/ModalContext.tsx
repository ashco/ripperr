import React from 'react';

import { ModalMode } from '../types/enums';

type ModalActionType =
  | 'MODAL_CLOSE'
  | 'MODAL_ADD_SELECT'
  | 'MODAL_DELETE'
  | 'MODAL_EDIT'
  | 'MODAL_VIEW';
type ModalAction = { type: ModalActionType };
type ModalDispatch = (action: ModalAction) => void;
type ModalState = { open: boolean; mode: ModalMode | null };
type ModalProviderProps = { children: React.ReactNode };

const INITIAL_MODAL_STATE: ModalState = {
  open: false,
  mode: null,
};

const ModalStateContext = React.createContext<ModalState | undefined>(
  undefined,
);
const ModalDispatchContext = React.createContext<ModalDispatch | undefined>(
  undefined,
);

function modalReducer(state: ModalState, action: ModalAction) {
  console.log(action.type);

  switch (action.type) {
    case 'MODAL_CLOSE':
      return { open: false, mode: null };
    case 'MODAL_ADD_SELECT':
      return { open: true, mode: ModalMode.AddSelect };
    case 'MODAL_DELETE':
      return { open: true, mode: ModalMode.Delete };
    case 'MODAL_EDIT':
      return { open: true, mode: ModalMode.Edit };
    case 'MODAL_VIEW':
      return { open: true, mode: ModalMode.View };
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

export { ModalProvider, useModalState, useModalDispatch };
