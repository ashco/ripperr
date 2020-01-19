import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { MovementFormRouter } from './index';

import { workoutModeOptions } from '../../common/data';
import { FormMode, WorkoutMode, MovementType } from '../../common/enums';
import {
  IWorkoutFormValues,
  IExercise,
  IWorkout,
  IFormError,
} from '../../common/types';

const MovementForm: React.FC<{
  formMode: FormMode;
  hide: () => void;
  movement?: IExercise | IWorkout;
}> = ({ formMode, hide, movement }) => {
  return (
    <WorkoutFormWrapper>
      <button onClick={hide}>Close</button>
      <MovementFormRouter formMode={formMode} hide={hide} movement={movement} />
    </WorkoutFormWrapper>
  );
};

const WorkoutFormWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default MovementForm;
