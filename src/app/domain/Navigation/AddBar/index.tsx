import React from 'react';

import { useModalDispatch } from '@/context/ModalContext';
import { useAddMoveMode } from '@/context/AddMoveModeContext';

const AddBar: React.FC = () => {
  const modalDispatch = useModalDispatch();
  const setAddMoveMode = useAddMoveMode()[1];

  function handleClose(): void {
    modalDispatch({ type: 'MODAL_EDIT' });
    setAddMoveMode(false);
  }

  return (
    <div>
      <button onClick={handleClose}>Cancel</button>
    </div>
  );
};

export default AddBar;
