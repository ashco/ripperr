import React, { useState } from 'react';

import { Modal } from '../Modal';
import { MovementForm } from '../Forms';

import { IExercise, IWorkout } from '../../common/types';
import { FormMode } from '../../common/enums';

const MovementFormButton: React.FC<{
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
      {/* <MovementFormRouter formMode={formMode} hide={hide} movement={movement} /> */}
      <MovementForm formMode={formMode} hide={hide} movement={movement} />
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
