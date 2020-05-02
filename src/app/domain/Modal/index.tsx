import React from 'react';
import styled from 'styled-components';

import { useModalState, useModalDispatch } from '@/context/ModalContext';
import { useMoveState } from '@/context/MoveContext';

import ColorBarWrapper from '@/components/ColorBarWrapper';

import AddMovementModal from './AddMovementModal';
import DeleteMovementModal from './DeleteMovementModal';
import MovementModal from './MovementModal';

import ModalRoot from './style';

import { ModalMode, MovementType } from '@/types/enums';

const Modal: React.FC = (props) => {
  const modalState = useModalState();
  const moveState = useMoveState();
  const modalDispatch = useModalDispatch();

  const bgRef = React.useRef<HTMLDivElement>(null);

  function handleClose(e: any): void {
    if (e.target === bgRef.current) {
      if (
        modalState.mode !== ModalMode.Add &&
        modalState.mode !== ModalMode.Edit
      ) {
        modalDispatch({ type: 'MODAL_CLOSE' });
      }
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
      modalComponent = <AddMovementModal />;
      barColor = 'green';
      break;
    case ModalMode.Delete:
      modalComponent = <DeleteMovementModal />;
      barColor = 'red';
      break;
    case ModalMode.Add:
    case ModalMode.Edit:
    case ModalMode.View:
      modalComponent = <MovementModal mode={modalState.mode} />;

      if (!moveState) throw Error('No moveState');
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
      }
      break;
    default:
      break;
  }

  return (
    <ModalRoot>
      {modalState.open && (
        <div className="background" ref={bgRef}>
          <div className="modal-wrapper">
            <ColorBarWrapper color={barColor}>{modalComponent}</ColorBarWrapper>
          </div>
        </div>
      )}
    </ModalRoot>
  );
};

export default Modal;
