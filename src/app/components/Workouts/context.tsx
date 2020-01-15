import React from 'react';
import { IWorkoutsFirebaseQuery } from '../../common/types';
import { INITIAL_WORKOUT_STATE } from './withWorkouts';

const WorkoutsContext = React.createContext<IWorkoutsFirebaseQuery>(
  INITIAL_WORKOUT_STATE,
);

export default WorkoutsContext;
