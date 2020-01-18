import React from 'react';
import styled from 'styled-components';
import { ListItem } from './index';

import { IExercise } from '../../common/types';

const ExerciseListItem: React.FC<{ exercise: IExercise }> = ({ exercise }) => {
  console.log('e');
  return (
    <ExerciseListItemWrapper>
      <span>
        <strong>Exercise Name: </strong>
        {exercise.name}
      </span>
    </ExerciseListItemWrapper>
  );
};

const ExerciseListItemWrapper = styled(ListItem)`
  height: 140px;
  background: green;
`;

export default ExerciseListItem;
