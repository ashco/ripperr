import React from 'react';
import { IWorkoutsState } from '../../common/types';
import { INITIAL_WORKOUT_STATE } from './withWorkouts';

const WorkoutsContext = React.createContext<IWorkoutsState>(
  INITIAL_WORKOUT_STATE,
);

export default WorkoutsContext;
