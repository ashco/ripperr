import React from 'react';
import { useSelector, useDispatch } from 'store';
// import { useModalState } from 'context/ModalContext';

import Modal from 'components/Modal';
import AddMovementModal from 'features/ModalRouter/AddMovementModal';
import DeleteMovementModal from 'features/ModalRouter/DeleteMovementModal';
import MovementModal from 'features/ModalRouter/MovementModal';

const ModalRouter = () => {
  const { modalMode } = useSelector((state) => state.ui);

  let content = null;

  switch (modalMode) {
    case 'ADD':
      content = <AddMovementModal />;
      break;
    case 'DELETE':
      content = <DeleteMovementModal />;
      break;
    case 'EDIT':
    case 'VIEW':
      content = <MovementModal />;
      break;
  }

  return <Modal isOpen={!!modalMode}>{content}</Modal>;
};

export default ModalRouter;
