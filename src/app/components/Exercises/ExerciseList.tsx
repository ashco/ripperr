import styled from 'styled-components';
import { InterfaceExercise } from '../../pages/exercises';

const ExerciseList = ({ exercises }: any) => (
  <ExerciseListWrapper>
    {exercises.map((exercise: InterfaceExercise) => (
      <ExerciseListItem key={exercise.name}>
        <span>
          <strong>Exercise Name:</strong> {exercise.name}
        </span>
      </ExerciseListItem>
    ))}
  </ExerciseListWrapper>
);

const ExerciseListWrapper = styled.ul``;

const ExerciseListItem = styled.li`
  height: 200px;
  width: 400px;
  background: #eee;
  margin-bottom: 2rem;
`;

export default ExerciseList;
