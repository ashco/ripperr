import React, { useState, useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { useModalState, useModalDispatch } from '../../context/ModalContext';

import { ModalBackground, ModalWrapper } from '../Modal';
import MovementModal from './MovementModal';

import { IModalState, IModalReducerAction } from '../../common/types';
import { ModalActionType, FormMode } from '../../common/enums';

// export const INITIAL_MODAL_STATE: IModalState = {
//   open: true,
// };

// function modalReducer(state: IModalState, action: IModalReducerAction) {
//   switch (action.type) {
//     case ModalActionType.Open:
//       return { open: true };
//     case ModalActionType.Close:
//       return { open: false };
//   }
// }

const NewModal: React.FC = (props) => {
  // const [modalState, modalDispatch] = useReducer(
  //   modalReducer,
  //   INITIAL_MODAL_STATE,
  // );

  const modalState = useModalState();
  console.log(modalState);

  return (
    <ModalRoot>
      {modalState.open && (
        <ModalBackground>
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

export default NewModal;
