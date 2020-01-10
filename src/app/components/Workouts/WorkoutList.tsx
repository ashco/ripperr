import styled from 'styled-components';

import { WorkoutListItem } from '../Workouts';
import { IWorkout } from '../../common/types';

const WorkoutList = ({ workouts }: any) => (
  <WorkoutListWrapper>
    {workouts.map((workout: IWorkout) => (
      <WorkoutListItem key={workout.id} workout={workout} />
    ))}
  </WorkoutListWrapper>
);

const WorkoutListWrapper = styled.ul``;

export default WorkoutList;
