import React, { useState } from 'react';
import { Modal, DeleteModal } from '../Modal';
import { Button } from '../Buttons';

const DeleteButton: React.FC<{
  text: string;
  handleDelete: () => void;
}> = ({ text, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const hide = (): void => setShowModal(false);
  const show = (e: any): void => {
    setShowModal(true);
  };

  const modal = showModal ? (
    <Modal>
      <DeleteModal text={text} handleDelete={handleDelete} hide={hide} />
    </Modal>
  ) : null;

  return (
    <>
      <Button onClick={(e) => show(e)}>Delete</Button>
      {modal}
    </>
  );
};

export default DeleteButton;
