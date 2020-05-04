import React from 'react';

import { useModalState, useModalDispatch } from '@/context/ModalContext';
import { useMoveState } from '@/context/MoveContext';

import ColorBarWrapper from '@/components/ColorBarWrapper';

import AddMovementContainer from './AddMovementContainer';
import DeleteMovementContainer from './DeleteMovementContainer';
import MovementContainer from './MovementContainer';

import ModalRoot from './style';

import { ModalMode, MovementType } from '@/types/enums';
import { Movement } from '@/types/types';
import singleCapString from '@/utils/singleCapString';

const Modal: React.FC = () => {
  const modalState = useModalState();
  const moveState = useMoveState();
  const modalDispatch = useModalDispatch();

  const bgRef = React.useRef<HTMLDivElement>(null);

  let modalContent;
  let headerText;
  let barColor;

  // Determine modalContent
  switch (modalState.mode) {
    case ModalMode.AddSelect:
      modalContent = <AddMovementContainer />;
      break;

    case ModalMode.Delete:
      modalContent = <DeleteMovementContainer />;
      break;

    case ModalMode.Add:
    case ModalMode.Edit:
    case ModalMode.View:
      modalContent = <MovementContainer mode={modalState.mode} />;
      break;

    default:
      break;
  }

  // Determine headerText
  switch (modalState.mode) {
    case ModalMode.AddSelect:
      headerText = 'Create Movement';
      break;

    case ModalMode.Delete:
    case ModalMode.View:
      headerText = moveState?.name;
      break;

    case ModalMode.Add:
    case ModalMode.Edit:
      headerText = `${singleCapString(modalState.mode)} ${singleCapString(
        (moveState as Movement).type,
      )}`;
      break;

    default:
      break;
  }

  switch (modalState.mode) {
    case ModalMode.AddSelect:
      barColor = 'green';
      break;
    case ModalMode.Delete:
      barColor = 'red';
      break;
    case ModalMode.Add:
    case ModalMode.Edit:
    case ModalMode.View:
      switch ((moveState as Movement).type) {
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
      }
      break;
    default:
      break;
  }

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

  return (
    <ModalRoot type={moveState?.type}>
      {modalState.open && (
        <div className="background" ref={bgRef}>
          <div className="wrapper">
            <ColorBarWrapper color={barColor}>
              <div className="container">
                <h1 className="header">{headerText}</h1>
                {modalContent}
              </div>
            </ColorBarWrapper>
          </div>
        </div>
      )}
    </ModalRoot>
  );
};

export default Modal;
