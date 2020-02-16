import React, { useState, useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { useModalState, useModalDispatch } from '../../context/ModalContext';

import { ModalBackground, ModalWrapper, DeleteMovementModal } from '../Modal';
import AddMovementModal from './AddMovementModal';
import { ModalMode } from '../../common/enums';

const Modal: React.FC = (props) => {
  const modalState = useModalState();

  return (
    <ModalRoot>
      {modalState.open && (
        <ModalBackground>
          {modalState.mode === ModalMode.Add && <AddMovementModal />}
          {modalState.mode === ModalMode.Delete && <DeleteMovementModal />}
          {/* <MovementModal
            formMode={FormMode.Add}
            hide={() => modalDispatch({ type: ModalActionType.Close })}
          /> */}
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
