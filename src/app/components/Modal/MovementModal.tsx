import React, { useState } from 'react';
import styled from 'styled-components';

import { ModalWrapper } from './index';
import { ExerciseForm, WorkoutForm, SelectAddForm } from '../Forms';

import { FormMode, MovementType } from '../../common/enums';
import { IExercise, IWorkout } from '../../common/types';

const MovementModal: React.FC<{
  formMode: FormMode;
  hide: () => void;
  movement?: IExercise | IWorkout;
}> = ({ formMode, hide, movement }) => {
  // Determine type to add
  const [addMovementType, setAddMovementType] = useState<MovementType | null>(
    null,
  );
  const addExercise = () => setAddMovementType(MovementType.Exercise);
  const addWorkout = () => setAddMovementType(MovementType.Workout);

  function renderForm() {
    if (
      addMovementType === MovementType.Exercise ||
      (movement && movement.type === MovementType.Exercise)
    ) {
      return (
        <ExerciseForm
          formMode={formMode}
          hide={hide}
          exercise={movement as IExercise}
        />
      );
    } else if (
      addMovementType === MovementType.Workout ||
      (movement && movement.type === MovementType.Workout)
    ) {
      return (
        <WorkoutForm
          formMode={formMode}
          hide={hide}
          workout={movement as IWorkout}
        />
      );
    } else if (addMovementType === null) {
      return (
        <SelectAddForm
          addExercise={addExercise}
          addWorkout={addWorkout}
          hide={hide}
        />
      );
    }
  }

  return <MovementModalWrapper>{renderForm()}</MovementModalWrapper>;
};

const MovementModalWrapper = styled(ModalWrapper)`
  padding: 3rem 2rem;
`;

export default MovementModal;
