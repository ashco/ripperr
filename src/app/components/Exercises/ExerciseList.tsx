import React from 'react';
import styled from 'styled-components';

import { ExerciseListItem } from '../Exercises';
import { IExercise } from '../../common/types';

const ExerciseList: React.FC<{ exercises: IExercise[] }> = ({ exercises }) => (
  <ExerciseListWrapper>
    {exercises.map((exercise: IExercise) => (
      <ExerciseListItem key={exercise.exerciseId} exercise={exercise} />
    ))}
  </ExerciseListWrapper>
);

const ExerciseListWrapper = styled.ul``;

export default ExerciseList;
