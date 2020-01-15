import React from 'react';
import { IExercisesFirebaseQuery } from '../../common/types';
import { INITIAL_EXERCISE_STATE } from './withExercises';

const ExercisesContext = React.createContext<IExercisesFirebaseQuery>(
  INITIAL_EXERCISE_STATE,
);

export default ExercisesContext;
