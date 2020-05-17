import React from 'react';
import { useSelector, useDispatch } from 'store';
// import { useModalState } from 'context/ModalContext';

import Modal from 'components/Modal';
import AddMovementModal from 'features/ModalRouter/AddMovementModal';
import DeleteMovementModal from 'features/ModalRouter/DeleteMovementModal';
import MovementModal from 'features/ModalRouter/MovementModal';

import { MovementType } from 'types/types';

const ModalRouter = () => {
  const { modalMode } = useSelector((state) => state.ui);
  const moves = useSelector((state) => state.moves);

  const [addMoveType, setAddMoveType] = React.useState<MovementType | null>(
    null,
  );

  let content = null;

  switch (modalMode) {
    case 'ADD':
      content = <AddMovementModal setAddMoveType={setAddMoveType} />;
      break;
    case 'DELETE':
      content = <DeleteMovementModal moves={moves} />;
      break;
    case 'EDIT':
    case 'VIEW':
      content = (
        <MovementModal
          addMoveType={addMoveType}
          modalMode={modalMode}
          moves={moves}
        />
      );
      break;
  }

  return <Modal isOpen={modalMode !== 'CLOSED'}>{content}</Modal>;
};

export default ModalRouter;
