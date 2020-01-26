import React, { useContext } from 'react';
import styled from 'styled-components';

import { MovementsContext } from '../../context';

import { ExerciseListItem, WorkoutListItem } from '../ListItems';

import { IWorkout, IExercise, IMovementState } from '../../common/types';
import { MovementType } from '../../common/enums';

// const MovementList: React.FC<{
//   movements: IMovementsFirebaseQuery;

function sortMovements(
  a: IExercise | IWorkout,
  b: IExercise | IWorkout,
): number {
  if (a.lastModified !== null && b.lastModified !== null) {
    const aTime = (a.lastModified as firebase.firestore.Timestamp)
      .toDate()
      .getTime();
    const bTime = (b.lastModified as firebase.firestore.Timestamp)
      .toDate()
      .getTime();

    return bTime - aTime;
  } else {
    return 0;
  }
}

const MovementList: React.FC = () => {
  const movements = useContext(MovementsContext);

  const movementList = [...movements.exercises, ...movements.workouts];
  movementList.sort((a, b) => sortMovements(a, b));

  // TODO - sort by most recently updated

  function renderListItem(move: IWorkout | IExercise) {
    if (move.type === MovementType.Exercise) {
      return <ExerciseListItem key={move.id} exercise={move as IExercise} />;
    } else if (move.type === MovementType.Workout) {
      return <WorkoutListItem key={move.id} workout={move as IWorkout} />;
    } else {
      return null;
    }
  }

  return (
    <MovementListWrapper>
      {movements.loading ? (
        <div>Loading ...</div>
      ) : (
        movementList.map((move: IWorkout | IExercise) => renderListItem(move))
      )}
    </MovementListWrapper>
  );
};

const MovementListWrapper = styled.ul`
  margin-top: ${(p) => p.theme.space[4]};
`;

export default MovementList;
