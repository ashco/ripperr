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
    if (addMovementType === null) {
      return (
        <SelectAddForm addExercise={addExercise} addWorkout={addWorkout} />
      );
    } else if (addMovementType === MovementType.Exercise) {
      return (
        <ExerciseForm
          formMode={formMode}
          hide={hide}
          exercise={movement as IExercise}
        />
      );
    } else if (addMovementType === MovementType.Workout) {
      return (
        <WorkoutForm
          formMode={formMode}
          hide={hide}
          workout={movement as IWorkout}
        />
      );
    } else {
      return <div>Nothing to see here...</div>;
    }
  }

  return <WorkoutFormWrapper>{renderForm()}</WorkoutFormWrapper>;
};

const WorkoutFormWrapper = styled(ModalWrapper)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 90%;
  padding: 4rem 3rem;
`;

export default MovementModal;
