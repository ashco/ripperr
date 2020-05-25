import React from 'react';
import { useSelector } from 'store';

import { MovementType, Movement, Move } from 'types';

function useLookupMove(id: string | null): Move | null {
  const { workouts, exercises, tags } = useSelector((state) => state.moves);

  if (id === null) return null;

  if (workouts && Object.keys(workouts.byId).includes(id)) {
    return { data: workouts.byId[id], type: 'WORKOUT' };
  } else if (exercises && Object.keys(exercises.byId).includes(id)) {
    return { data: exercises.byId[id], type: 'EXERCISE' };
  } else if (tags && Object.keys(tags.byId).includes(id)) {
    return { data: tags.byId[id], type: 'TAG' };
  } else {
    return null;
  }
}

export default useLookupMove;
