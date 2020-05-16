import React from 'react';
import { useDispatch, useSelector } from 'store';

import { Movement } from 'store/moves';

type MovementType = 'workout' | 'exercise' | 'tag';

function lookupMove(id: string): { move: Movement; type: MovementType } {
  const { workouts, exercises, tags } = useSelector((state) => state.moves);
  // const move = moves.exercises.byId[id] || {};
  let move: Movement;
  let type: MovementType;

  if (Object.keys(workouts.byId).includes(id)) {
    move = workouts.byId[id];
    type = 'workout';
  } else if (Object.keys(exercises.byId).includes(id)) {
    move = exercises.byId[id];
    type = 'exercise';
  } else if (Object.keys(tags.byId).includes(id)) {
    move = tags.byId[id];
    type = 'tag';
  } else {
    throw Error('id not recognized!');
  }

  return { move, type };
}

export default lookupMove;
