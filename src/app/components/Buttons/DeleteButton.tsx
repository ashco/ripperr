import { useState } from 'react';
import { DeleteModal } from '../Modal';

const DeleteButton = ({ text, handleDelete }: any) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const hide = (): void => setShowDeleteModal(false);
  const show = (): void => setShowDeleteModal(true);

  const modal = showDeleteModal ? (
    <DeleteModal text={text} handleDelete={handleDelete} hide={hide} />
  ) : null;

  return (
    <>
      <button onClick={show}>Delete</button>
      {modal}
    </>
  );
};

export default DeleteButton;
