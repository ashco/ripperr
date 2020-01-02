import React, { useState } from 'react';
import { Modal, ExerciseFormModal } from '../Modal';
import { InterfaceExercise } from '../../pages/exercises';

export type Mode = 'Add' | 'Edit';

const ExerciseFormButton: React.FunctionComponent<{
  mode: Mode;
  exercise?: InterfaceExercise;
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
      <ExerciseFormModal mode={mode} hide={hide} exercise={exercise} />
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
