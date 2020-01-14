import React from 'react';
import styled from 'styled-components';

import { WorkoutListItem } from '../Workouts';
import { IWorkout, IExercise } from '../../common/types';

const WorkoutList: React.FC<{
  workouts: IWorkout[];
  exercises: IExercise[];
}> = ({ workouts, exercises }) => (
  <WorkoutListWrapper>
    {workouts.map((workout: IWorkout) => (
      <WorkoutListItem
        key={workout.woId}
        workout={workout}
        exercises={exercises}
      />
    ))}
  </WorkoutListWrapper>
);

const WorkoutListWrapper = styled.ul``;

export default WorkoutList;
