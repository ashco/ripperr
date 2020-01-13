import React, { useState } from 'react';

import { Modal } from '../../Modal';
import { WorkoutForm } from '..';
import { FormMode, IWorkout } from '../../../common/types';

const WorkoutFormButton: React.FC<{
  formMode: FormMode;
  workout?: IWorkout;
}> = ({ formMode, workout }) => {
  const [showModal, setShowModal] = useState(false);

  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  let buttonText;

  if (formMode === 'Add') {
    buttonText = 'Add Workout';
  } else if (formMode === 'Edit') {
    buttonText = 'Edit Workout';
  }

  const modal = showModal ? (
    <Modal>
      <WorkoutForm formMode={formMode} hide={hide} workout={workout} />
    </Modal>
  ) : null;

  return (
    <>
      <button onClick={show}>{buttonText}</button>
      {modal}
    </>
  );
};

export default WorkoutFormButton;
