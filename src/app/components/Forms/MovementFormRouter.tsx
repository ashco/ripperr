import React, { useState } from 'react';
import styled from 'styled-components';

import { ExerciseForm, WorkoutForm } from './index';
import { FormWrapper } from './styles';

import { FormMode, MovementType } from '../../common/enums';
import { IWorkout, IExercise } from '../../common/types';

const MovementFormRouter: React.FC<{
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

  function renderAddForm() {
    if (addMovementType === null) {
      return (
        <SelectAddForm addExercise={addExercise} addWorkout={addWorkout} />
      );
    } else if (addMovementType === MovementType.Exercise) {
      return <ExerciseForm formMode={formMode} hide={hide} />;
    } else if (addMovementType === MovementType.Workout) {
      return <WorkoutForm formMode={formMode} hide={hide} />;
    }
  }

  function renderEditForm() {
    if (movement && movement.type === MovementType.Exercise) {
      return (
        <ExerciseForm
          formMode={formMode}
          hide={hide}
          exercise={movement as IExercise}
        />
      );
    } else if (movement && movement.type === MovementType.Workout) {
      return (
        <WorkoutForm
          formMode={formMode}
          hide={hide}
          workout={movement as IWorkout}
        />
      );
    }
  }

  function renderForm() {
    if (formMode === FormMode.Add) {
      return renderAddForm();
    } else if (formMode === FormMode.Edit) {
      return renderEditForm();
    } else {
      return <div>Nothing to see here...</div>;
    }
  }

  return <>{renderForm()}</>;
};

const SelectAddForm: React.FC<{
  addExercise: () => void;
  addWorkout: () => void;
}> = ({ addExercise, addWorkout }) => {
  return (
    <SelectAddFormWrapper>
      <button onClick={addExercise}>Add Exercise</button>
      <button onClick={addWorkout}>Add Workout</button>
    </SelectAddFormWrapper>
  );
};

const SelectAddFormWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  button {
    font-size: 1.8rem;
    margin: 0.25rem;
    padding: 0.6rem;
  }
`;

export default MovementFormRouter;
