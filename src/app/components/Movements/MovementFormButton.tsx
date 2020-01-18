import React, { useState } from 'react';

import { Modal } from '../Modal';
import { MovementForm } from './index';

import { FormMode } from '../../common/enums';

const MovementFormButton: React.FC<{
  formMode: FormMode;
}> = ({ formMode }) => {
  const [showModal, setShowModal] = useState(false);
  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  let buttonText;
  if (formMode === FormMode.Add) {
    buttonText = 'Add Workout';
  } else if (formMode === FormMode.Edit) {
    buttonText = 'Edit Workout';
  }

  const modal = showModal ? (
    <Modal>
      <MovementForm formMode={formMode} hide={hide} />
    </Modal>
  ) : null;

  return (
    <>
      <button onClick={show}>{buttonText}</button>
      {modal}
    </>
  );
};

export default MovementFormButton;
