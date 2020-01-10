import React, { useState } from 'react';

import { Modal } from '../Modal';
import { WorkoutFormModal } from '../Workouts';
import { IWorkout } from '../../common/types';

export type Mode = 'Add' | 'Edit';

const WorkoutFormButton: React.FC<{
  mode: Mode;
  workout?: IWorkout;
}> = ({ mode, workout }) => {
  const [showModal, setShowModal] = useState(false);

  const hide = (): void => setShowModal(false);
  const show = (): void => setShowModal(true);

  let buttonText;

  if (mode === 'Add') {
    buttonText = 'Add Workout';
  } else if (mode === 'Edit') {
    buttonText = 'Edit Workout';
  }

  const modal = showModal ? (
    <Modal>
      <WorkoutFormModal mode={mode} hide={hide} workout={workout} />
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
