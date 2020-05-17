import React from 'react';
import { useDispatch, useSelector } from 'store';
import { Movement, MovesState } from 'store/moves';

import { MovementType } from 'types/types';

export interface MoveDataType {
  data: Movement;
  type: MovementType;
}

export function lookupMove(
  moves: MovesState,
  id: string | null = moves.activeId,
): MoveDataType | null {
  const { workouts, exercises, tags } = moves;
  if (!id) return null;

  let data: Movement;
  let type: MovementType;

  if (Object.keys(workouts.byId).includes(id)) {
    data = workouts.byId[id];
    type = 'WORKOUT';
  } else if (Object.keys(exercises.byId).includes(id)) {
    data = exercises.byId[id];
    type = 'EXERCISE';
  } else if (Object.keys(tags.byId).includes(id)) {
    data = tags.byId[id];
    type = 'TAG';
  } else {
    throw Error('id not recognized!');
  }

  return { data, type };
}

lookupMove;
