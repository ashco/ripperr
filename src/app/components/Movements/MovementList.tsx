import React from 'react';
import styled from 'styled-components';

// import { ExerciseListItem } from '../Es';
import { ExerciseListItem, WorkoutListItem } from '../ListItems';
import { IWorkout, IExercise, IMovementState } from '../../common/types';
import { MovementType } from '../../common/enums';

// const MovementList: React.FC<{
//   movements: IMovementsFirebaseQuery;

const MovementList: React.FC<{ movements: IMovementState }> = ({
  movements,
}) => {
  const movementList = [...movements.exercises, ...movements.workouts];

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
      {movementList.map((move: IWorkout | IExercise) => renderListItem(move))}
    </MovementListWrapper>
  );
};

const MovementListWrapper = styled.ul``;

export default MovementList;
