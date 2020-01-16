import React from 'react';
import { IMovementsFirebaseQuery } from '../../common/types';
import { INITIAL_WORKOUT_STATE } from './withMovements';

const MovementsContext = React.createContext<IMovementsFirebaseQuery>(
  INITIAL_WORKOUT_STATE,
);

export default MovementsContext;
