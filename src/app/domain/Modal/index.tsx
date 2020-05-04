import React from 'react';

import { useModalState, useModalDispatch } from '@/context/ModalContext';
import { useMoveState } from '@/context/MoveContext';

import ColorBarWrapper from '@/components/ColorBarWrapper';

import AddMovementContainer from './AddMovementContainer';
import DeleteMovementContainer from './DeleteMovementContainer';
import EditMovementContainer from './EditMovementContainer';
import ViewMovementContainer from './ViewMovementContainer';

import ModalRoot from './style';

import { ModalMode, MovementType } from '@/types/enums';
import singleCapString from '@/utils/singleCapString';

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
  let modalContent;
  let barColor;
  let headerText;

  switch (modalState.mode) {
    case ModalMode.AddSelect:
      modalContent = <AddMovementContainer />;
      barColor = 'green';
      headerText = 'Create Movement';
      break;
    case ModalMode.Delete:
      modalContent = <DeleteMovementContainer />;
      barColor = 'red';
      headerText = moveState?.name;
      break;
    case ModalMode.Add:
    case ModalMode.Edit:
      modalContent = <EditMovementContainer mode={modalState.mode} />;

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

      headerText = `${singleCapString(modalState.mode)} ${singleCapString(
        moveState.type,
      )}`;
      break;
    case ModalMode.View:
      modalContent = <ViewMovementContainer />;
      barColor = 'green';
      headerText = 'TEMPORARY';
      break;
    default:
      break;
  }

  return (
    <ModalRoot>
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
    // <ModalRoot>
    //   {modalState.open && (
    //     <div className="background" ref={bgRef}>
    //       <div className="modal-wrapper">
    //         {/* <ColorBarWrapper color={barColor}>{modalContent}</ColorBarWrapper> */}
    //         <ColorBarWrapper color={barColor}>
    //           <ModalWrapper>
    //             <h1 className="header">{headerText}</h1>
    //             {modalContent}
    //           </ModalWrapper>
    //         </ColorBarWrapper>
    //       </div>
    //     </div>
    //   )}
    // </ModalRoot>
  );
};

export default Modal;
