import React from 'react';

import { useModalState, useModalDispatch } from 'context/ModalContext';
import { useMoveState } from 'context/MoveContext';

import ColorBarWrapper from 'components/ColorBarWrapper';

import AddMovementContainer from './AddMovementContainer';
import DeleteMovementContainer from './DeleteMovementContainer';
import MovementContainer from './MovementContainer';

import ModalRoot from './style';

import { ModalMode, MovementType } from 'types/enums';
import { Movement } from 'types/types';
import singleCapString from '@/utils/single-cap-string';

const Modal: React.FC = () => {
  const modalState = useModalState();
  const moveState = useMoveState();
  const modalDispatch = useModalDispatch();

  const bgRef = React.useRef<HTMLDivElement>(null);

  let modalContent;
  let headerText;
  let barColor;
  let modalWidth;

  // Determine modalContent
  switch (modalState.mode) {
    case ModalMode.AddSelect:
      modalContent = <AddMovementContainer />;
      break;

    case ModalMode.Delete:
      modalContent = <DeleteMovementContainer />;
      break;

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
      modalWidth = '28rem';
      break;
    case ModalMode.Delete:
      barColor = 'red';
      modalWidth = '32rem';
      break;
    case ModalMode.Edit:
    case ModalMode.View:
      switch ((moveState as Movement).type) {
        case MovementType.Archetype:
          barColor = 'orange';
          modalWidth = '32rem';
          break;
        case MovementType.Exercise:
          barColor = 'purple';
          modalWidth = '36rem';
          break;
        case MovementType.Workout:
          barColor = 'blue';
          modalWidth = '48rem';
          break;
        default:
      }
      break;
    default:
      break;
  }

  function handleClose(e: any): void {
    if (e.target === bgRef.current) {
      if (modalState.mode !== ModalMode.Edit) {
        modalDispatch({ type: 'MODAL_CLOSE' });
      }
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClose);

    return (): void => document.removeEventListener('click', handleClose);
  });

  return (
    <ModalRoot type={moveState?.type} modalWidth={modalWidth}>
      {modalState.open && (
        <div className="background" ref={bgRef}>
          <div className="wrapper">
            <ColorBarWrapper color={barColor}>
              <div className="modal-container">
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
