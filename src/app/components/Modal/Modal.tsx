import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { useModalState, useModalDispatch } from '../../context/ModalContext';
import { useMoveState } from '../../context/MoveContext';

import ColorBarContainer from '../Containers/ColorBarContainer';

import { ModalBackground, ModalWrapper, DeleteMovementModal } from '.';
import AddSelectModal from './AddSelectModal';
import MovementModal from './MovementModal';
import { ModalMode, MovementType } from '../../types/enums';

const Modal: React.FC = (props) => {
  const modalState = useModalState();
  const moveState = useMoveState();
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

  // Determine modal view
  let modalComponent;
  let barColor;

  switch (modalState.mode) {
    case ModalMode.AddSelect:
      modalComponent = <AddSelectModal />;
      barColor = 'green';
      break;
    case ModalMode.Add:
    case ModalMode.Edit:
    case ModalMode.View:
      modalComponent = <MovementModal mode={modalState.mode} />;

      if (!moveState) throw Error('No movestate');
      switch (moveState.type) {
        case MovementType.Archetype:
          barColor = 'orange';
          break;
        case MovementType.Exercise:
          barColor = 'purple';
          break;
        case MovementType.Workout:
          barColor = 'blue';
          break;
        default:
          throw Error('moveState.type value not expected: ' + moveState.type);
          break;
      }
      break;
    case ModalMode.Delete:
      modalComponent = <DeleteMovementModal />;
      barColor = 'red';
      break;
    default:
      break;
  }

  return (
    <ModalRoot>
      {modalState.open && (
        <ModalBackground ref={bgRef}>
          <ColorBarContainer color={barColor}>
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
          </ColorBarContainer>
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
