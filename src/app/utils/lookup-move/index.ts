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

  if (workouts && Object.keys(workouts.byId).includes(id)) {
    data = workouts.byId[id];
    type = 'WORKOUT';
  } else if (exercises && Object.keys(exercises.byId).includes(id)) {
    data = exercises.byId[id];
    type = 'EXERCISE';
  } else if (tags && Object.keys(tags.byId).includes(id)) {
    data = tags.byId[id];
    type = 'TAG';
  } else {
    return null;
  }

  return { data, type };
}
