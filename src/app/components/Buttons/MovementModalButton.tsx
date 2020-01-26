import React, { useState } from 'react';
import { Modal } from '../Modal';

import { MovementModal } from '../Forms';
import { Button } from '../Buttons';

import { IExercise, IWorkout } from '../../common/types';
import { FormMode } from '../../common/enums';

const MovementModalButton: React.FC<{
  formMode: FormMode;
  movement?: IExercise | IWorkout;
}> = ({ formMode, movement }) => {
  const [showModal, setShowModal] = useState(false);
  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  let buttonText;
  if (formMode === FormMode.Add) {
    buttonText = 'Add';
  } else if (formMode === FormMode.Edit) {
    buttonText = 'Edit';
  }

  const modal = showModal ? (
    <Modal>
      <MovementModal formMode={formMode} hide={hide} movement={movement} />
    </Modal>
  ) : null;

  return (
    <>
      <Button onClick={show}>{buttonText}</Button>
      {modal}
    </>
  );
};

export default MovementModalButton;
