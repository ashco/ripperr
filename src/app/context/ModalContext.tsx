import React from 'react';

import { FormMode, ModalMode } from '../common/enums';

type ModalActionType =
  | 'MODAL_CLOSE'
  | 'MODAL_ADD'
  | 'MODAL_DELETE'
  | 'MODAL_EDIT'
  | 'MODAL_VIEW';
type Action = { type: ModalActionType };
type Dispatch = (action: Action) => void;
type State = { open: boolean; mode: ModalMode | null };
type ModalProviderProps = { children: React.ReactNode };

const INITIAL_MODAL_STATE: State = {
  open: false,
  mode: null,
};

const ModalStateContext = React.createContext<State | undefined>(undefined);
const ModalDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

function modalReducer(state: State, action: Action) {
  console.log(action.type);

  switch (action.type) {
    case 'MODAL_CLOSE':
      return { open: false, mode: null };
    case 'MODAL_ADD':
      return { open: true, mode: ModalMode.Add };
    case 'MODAL_DELETE':
      return { open: true, mode: ModalMode.Delete };
    case 'MODAL_EDIT':
      return { open: true, mode: ModalMode.Edit };
    case 'MODAL_VIEW':
      return { open: true, mode: ModalMode.View };
    // default: {
    //   throw Error(`Unhandled action type: ${action.type}`);
    // }
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
