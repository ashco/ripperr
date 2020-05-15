import React from 'react';
import { useSelector, useDispatch } from 'store';
// import { useModalState } from 'context/ModalContext';

import Modal from 'components/Modal';
import AddMovementModal from 'domain/ModalRouter/AddMovementModal';
import DeleteMovementModal from 'domain/ModalRouter/DeleteMovementModal';
import MovementModal from 'domain/ModalRouter/MovementModal';
import { ModalMode } from 'types/enums';

const ModalRouter = () => {
  // const modal = useModalState();

  const { modal } = useSelector((state) => state);

  let content = null;

  switch (modal.mode) {
    case ModalMode.Add:
      content = <AddMovementModal />;
      break;
    case ModalMode.Delete:
      content = <DeleteMovementModal />;
      break;
    case ModalMode.Edit:
    case ModalMode.View:
      content = <MovementModal />;
      break;
  }

  return <Modal isOpen={modal.open}>{content}</Modal>;
};

export default ModalRouter;
