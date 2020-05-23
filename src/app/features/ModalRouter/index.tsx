import React from 'react';
import { useSelector } from 'store';

import AddMoveModal from 'features/ModalRouter/AddMoveModal';
import DeleteMoveModal from 'features/ModalRouter/DeleteMoveModal';
import MoveModal from 'features/ModalRouter/MoveModal';

import Modal from 'components/Modal';

import { MovementType } from 'types';

const ModalRouter = () => {
  const { modalMode } = useSelector((state) => state.ui);
  const moves = useSelector((state) => state.moves);

  const [addMoveType, setAddMoveType] = React.useState<MovementType | null>(
    null,
  );

  let content = null;

  switch (modalMode) {
    case 'ADD':
      content = <AddMoveModal setAddMoveType={setAddMoveType} />;
      break;
    case 'DELETE':
      content = <DeleteMoveModal moves={moves} />;
      break;
    case 'EDIT':
    case 'VIEW':
      content = (
        <MoveModal
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
