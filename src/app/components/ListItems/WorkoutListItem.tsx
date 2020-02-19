import React, { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
import { ListItemMenuButton } from '../Buttons';

import { Workout } from '../../common/types';
import { MovementType } from '../../common/enums';

const WorkoutListItem: React.FC<{ workout: Workout }> = ({ workout }) => {
  const themeContext = useContext(ThemeContext);

  const btnRef = useRef<HTMLDivElement>(null);

  return (
    <WorkoutListItemWrapper color={themeContext.color.yellow[500]}>
      <p className="name">{workout.name}</p>
      <div ref={btnRef}>
        <ListItemMenuButton movement={workout} />
      </div>
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled(ListItem)`
  grid-area: auto / auto / span 2 / span 2;
`;

export default WorkoutListItem;
