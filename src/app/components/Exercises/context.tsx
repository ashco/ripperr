import React from 'react';
import { IExerciseState } from '../../common/types';
import { INITIAL_EXERCISE_STATE } from './withExercises';

const ExercisesContext = React.createContext<IExerciseState>(
  INITIAL_EXERCISE_STATE,
);

export default ExercisesContext;
