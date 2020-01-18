import React from 'react';
import styled from 'styled-components';

import { WorkoutListItem } from '../Workouts';
import {
  IWorkout,
  IExercise,
  IMovementsFirebaseQuery,
} from '../../common/types';

// const MovementList: React.FC<{
//   movements: IMovementsFirebaseQuery;

// }> = ({ movements }) => {
const MovementList: React.FC<any> = ({ movements }) => {
  // const MovementList: React.FC<any> = (props) => {
  // const movementList = [...movements.workouts];
  // console.log(props);
  // const movement = props.movements;
  // const movementList = [
  //   ...props.movements.workouts,
  //   ...props.movements.exercises,
  // ];
  const movementList = [...movements.exercises, ...movements.workouts];
  console.log(movementList);

  // console.log(exercises);
  // console.log(workouts);
  return (
    <MovementListWrapper>
      {movementList.map((move: IWorkout) => {
        return (
          <div key={move.id}>{move.name}</div>
          // <WorkoutListItem
          // key={workout.id}
          // workout={workout}
          // exercises={exercises}
          // />
        );
      })}
    </MovementListWrapper>
  );
};

const MovementListWrapper = styled.ul``;

export default MovementList;
