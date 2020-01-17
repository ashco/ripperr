import React from 'react';
import { IMovementsFirebaseQuery } from '../../common/types';
import { INITIAL_MOVEMENT_STATE } from './withMovements';

const MovementsContext = React.createContext<IMovementsFirebaseQuery>(
  INITIAL_MOVEMENT_STATE,
);

export default MovementsContext;
