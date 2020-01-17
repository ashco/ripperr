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
const MovementList: React.FC<any> = (props) => {
  // const MovementList: React.FC<any> = (props) => {
  // const movementList = [...movements.workouts];
  // console.log(props);
  // const movement = props.movements;
  // const movementList = [
  //   ...props.movements.workouts,
  //   ...props.movements.exercises,
  // ];
  const movementList = props.movements.workouts;
  console.log(movementList);

  // console.log(exercises);
  // console.log(workouts);
  return (
    <MovementListWrapper>
      {movementList.map((move: IWorkout) => {
        return (
          <div>hello</div>
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
