import React from 'react';

import { INITIAL_MOVEMENT_STATE } from './withMovements';

import { IMovementState } from '../types/types';

const MovementListContext = React.createContext<IMovementState>(
  INITIAL_MOVEMENT_STATE,
);

export default MovementListContext;
