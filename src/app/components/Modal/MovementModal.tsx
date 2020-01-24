import React from 'react';
import styled from 'styled-components';

import { ModalWrapper } from './index';
import { MovementFormRouter } from '../Forms';

import { FormMode } from '../../common/enums';
import { IExercise, IWorkout } from '../../common/types';

const MovementModal: React.FC<{
  formMode: FormMode;
  hide: () => void;
  movement?: IExercise | IWorkout;
}> = ({ formMode, hide, movement }) => {
  return (
    <WorkoutFormWrapper>
      <button className="btn-close" onClick={hide}>
        X
      </button>
      <MovementFormRouter formMode={formMode} hide={hide} movement={movement} />
    </WorkoutFormWrapper>
  );
};

const WorkoutFormWrapper = styled(ModalWrapper)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 500px;
  .btn-close {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  .main {
    margin: 2rem auto;
    /* margin: 1rem auto; */
  }
`;

export default MovementModal;
