import React from 'react';
import styled from 'styled-components';

import { IExercise } from '../../common/types';
import ExerciseListItem from './ExerciseListItem';

const ExerciseList: React.FC<{ exercises: IExercise[] }> = ({ exercises }) => (
  <ExerciseListWrapper>
    {exercises.map((exercise: IExercise) => (
      <ExerciseListItem key={exercise.id} exercise={exercise} />
    ))}
  </ExerciseListWrapper>
);

const ExerciseListWrapper = styled.ul``;

export default ExerciseList;
