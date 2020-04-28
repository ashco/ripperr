import React, { useState, useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { useModalState, useModalDispatch } from '../../context/ModalContext';

import { ModalBackground, ModalWrapper, DeleteMovementModal } from '.';
import AddSelectModal from './AddSelectModal';
import MovementModal from './MovementModal';
import { ModalMode } from '../../types/enums';

const Modal: React.FC = (props) => {
  const modalState = useModalState();
  const modalDispatch = useModalDispatch();

  const bgRef = React.useRef<HTMLDivElement>(null);

  function handleClose(e: any): void {
    if (e.target === bgRef.current) {
      modalDispatch({ type: 'MODAL_CLOSE' });
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClose);

    return (): void => document.removeEventListener('click', handleClose);
  });

  return (
    <ModalRoot>
      {modalState.open && (
        <ModalBackground ref={bgRef}>
          {modalState.mode === ModalMode.AddSelect && <AddSelectModal />}
          {modalState.mode === ModalMode.Add && (
            <MovementModal mode={modalState.mode} />
          )}
          {modalState.mode === ModalMode.View && (
            <MovementModal mode={modalState.mode} />
          )}
          {modalState.mode === ModalMode.Edit && (
            <MovementModal mode={modalState.mode} />
          )}
          {modalState.mode === ModalMode.Delete && <DeleteMovementModal />}
        </ModalBackground>
      )}
    </ModalRoot>
  );
};

const ModalRoot = styled.div`
  position: relative;
  z-index: 999;
`;

export default Modal;
