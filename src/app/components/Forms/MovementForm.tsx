import React from 'react';
import styled from 'styled-components';

import { MovementFormRouter } from './index';

import { FormMode } from '../../common/enums';
import { IExercise, IWorkout } from '../../common/types';

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
