import React, { useState } from 'react';

import { Modal } from '../Modal';
import { ExerciseForm } from '../Exercises';
import { FormMode, IExercise } from '../../common/types';

const ExerciseFormButton: React.FC<{
  mode: FormMode;
  exercise?: IExercise;
}> = ({ mode, exercise }) => {
  const [showModal, setShowModal] = useState(false);

  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  let buttonText;

  if (mode === 'Add') {
    buttonText = 'Add Exercise';
  } else if (mode === 'Edit') {
    buttonText = 'Edit Exercise';
  }

  const modal = showModal ? (
    <Modal>
      <ExerciseForm mode={mode} hide={hide} exercise={exercise} />
    </Modal>
  ) : null;

  return (
    <>
      <button onClick={show}>{buttonText}</button>
      {modal}
    </>
  );
};

export default ExerciseFormButton;
