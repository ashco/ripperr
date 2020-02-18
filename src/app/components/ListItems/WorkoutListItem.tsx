import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
import { ListItemMenuButton } from '../Buttons';

import { Workout } from '../../common/types';
import { MovementType } from '../../common/enums';

const WorkoutListItem: React.FC<{ workout: Workout }> = ({ workout }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const themeContext = useContext(ThemeContext);

  const deleteText = `Do you want to delete this workout: ${workout.name}?`;

  function handleDelete(): void {
    if (authUser && workout.id) {
      firebase
        .workout(authUser.uid, workout.id)
        .delete()
        .then(() => console.log(`Workout Deleted: ${workout.name}`))
        .catch((err) => console.error(err));
    } else {
      throw Error('No authUser && workout.id!');
    }
  }

  return (
    <WorkoutListItemWrapper color={themeContext.color.yellow[500]}>
      <p className="name">{workout.name}</p>
      <ListItemMenuButton
        movement={workout}
        deleteText={deleteText}
        handleDeleteMovement={handleDelete}
      />
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled(ListItem)`
  grid-area: auto / auto / span 2 / span 2;
`;

export default WorkoutListItem;
