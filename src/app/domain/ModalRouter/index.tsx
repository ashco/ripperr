import React from 'react';
import { useSelector, useDispatch } from 'store';
// import { useModalState } from 'context/ModalContext';

import Modal from 'components/Modal';
import AddMovementModal from 'domain/ModalRouter/AddMovementModal';
import DeleteMovementModal from 'domain/ModalRouter/DeleteMovementModal';
import MovementModal from 'domain/ModalRouter/MovementModal';

const ModalRouter = () => {
  const { modalMode } = useSelector((state) => state.modal);

  let content = null;

  switch (modalMode) {
    case 'MODAL_ADD':
      content = <AddMovementModal />;
      break;
    case 'MODAL_DELETE':
      content = <DeleteMovementModal />;
      break;
    case 'MODAL_EDIT':
    case 'MODAL_VIEW':
      content = <MovementModal />;
      break;
  }

  return <Modal isOpen={modalMode !== 'MODAL_CLOSED'}>{content}</Modal>;
};

export default ModalRouter;
