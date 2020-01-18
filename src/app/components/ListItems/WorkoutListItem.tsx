import React from 'react';
import styled from 'styled-components';
import { ListItem } from './index';

import { IWorkout } from '../../common/types';

const WorkoutListItem: React.FC<{ workout: IWorkout }> = ({ workout }) => {
  return (
    <WorkoutListItemWrapper>
      <span>
        <strong>Workout Name: </strong>
        {workout.name}
      </span>
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled(ListItem)`
  height: 200px;
  background: orange;
`;

export default WorkoutListItem;
