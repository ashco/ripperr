import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from '../../Modal';
import { ExerciseForm } from '../index';
import { FormMode, IExercise } from '../../../common/types';

const ExerciseFormButton: React.FC<{
  formMode: FormMode;
  exercise?: IExercise;
}> = ({ formMode, exercise }) => {
  const [showModal, setShowModal] = useState(false);

  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  let buttonText;

  if (formMode === 'Add') {
    buttonText = 'Add Exercise';
  } else if (formMode === 'Edit') {
    buttonText = 'Edit Exercise';
  }

  const modal = showModal ? (
    <Modal>
      <ExerciseForm formMode={formMode} hide={hide} exercise={exercise} />
    </Modal>
  ) : null;

  return (
    <>
      <button onClick={show}>{buttonText}</button>
      {modal}
    </>
  );
};

// const NewFormButton = styled.button`
//   padding: 1rem;
//   position: fixed;
//   bottom: 2rem;
//   right: 2rem;
// `;

export default ExerciseFormButton;
