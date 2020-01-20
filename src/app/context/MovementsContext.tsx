import React from 'react';

import { INITIAL_MOVEMENT_STATE } from './withMovements';

import { IMovementState } from '../common/types';

const MovementsContext = React.createContext<IMovementState>(
  INITIAL_MOVEMENT_STATE,
);

export default MovementsContext;
