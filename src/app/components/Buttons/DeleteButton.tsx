﻿import { useState } from 'react';
import { Modal, DeleteModal } from '../Modal';

const DeleteButton = ({ text, handleDelete }: any) => {
  const [showModal, setShowModal] = useState(false);

  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  const modal = showModal ? (
    <Modal>
      <DeleteModal text={text} handleDelete={handleDelete} hide={hide} />
    </Modal>
  ) : null;

  return (
    <>
      <button onClick={show}>Delete</button>
      {modal}
    </>
  );
};

export default DeleteButton;