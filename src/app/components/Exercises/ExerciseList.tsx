import styled from 'styled-components';
import { IExercise } from '../../pages/exercises';
import ExerciseListItem from './ExerciseListItem';

const ExerciseList = ({ exercises }: any) => (
  <ExerciseListWrapper>
    {exercises.map((exercise: IExercise) => (
      <ExerciseListItem key={exercise.id} exercise={exercise} />
    ))}
  </ExerciseListWrapper>
);

const ExerciseListWrapper = styled.ul``;

export default ExerciseList;
