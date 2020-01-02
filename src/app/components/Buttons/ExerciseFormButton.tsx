import React, { useState } from 'react';
import { Modal, ExerciseFormModal } from '../Modal';

export type Mode = 'Add' | 'Edit';

const ExerciseFormButton: React.FunctionComponent<{
  mode: Mode;
}> = ({ mode }) => {
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
      <ExerciseFormModal mode={mode} hide={hide} />
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
