import React from 'react';
import { IMovementState } from '../../common/types';
import { INITIAL_MOVEMENT_STATE } from './withMovements';

const MovementsContext = React.createContext<IMovementState>(
  INITIAL_MOVEMENT_STATE,
);

export default MovementsContext;
