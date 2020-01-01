import styled from 'styled-components';
import { InterfaceExercise } from '../../pages/exercises';
import ExerciseListItem from './ExerciseListItem';

const ExerciseList = ({ exercises }: any) => (
  <ExerciseListWrapper>
    {exercises.map((exercise: InterfaceExercise) => (
      <ExerciseListItem key={exercise.name} exercise={exercise} />
    ))}
  </ExerciseListWrapper>
);

const ExerciseListWrapper = styled.ul``;

export default ExerciseList;
