import React from 'react';
import { IExercisePageState } from '../../common/types';
import { INITIAL_EXERCISE_STATE } from './withExercises';

const ExercisesContext = React.createContext<IExercisePageState>(
  INITIAL_EXERCISE_STATE,
);

export default ExercisesContext;
