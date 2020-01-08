import styled from 'styled-components';
import { IWorkout } from '../../pages/workouts';
import WorkoutListItem from './WorkoutListItem';

const WorkoutList = ({ workouts }: any) => (
  <WorkoutListWrapper>
    {workouts.map((workout: IWorkout) => (
      <WorkoutListItem key={workout.id} workout={workout} />
    ))}
  </WorkoutListWrapper>
);

const WorkoutListWrapper = styled.ul``;

export default WorkoutList;
