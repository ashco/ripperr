import React, { useState } from 'react';
import { Modal, DeleteModal } from '../Modal';
import { Button } from '../Buttons';

const DeleteButton: React.FC<{
  text: string;
  handleDelete: () => void;
}> = ({ text, handleDelete }) => {
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
      <Button onClick={show}>Delete</Button>
      {modal}
    </>
  );
};

export default DeleteButton;
