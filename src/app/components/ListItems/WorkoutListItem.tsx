import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
import { Button, MovementFormButton, ListItemMenuButton } from '../Buttons';

import { IWorkout } from '../../common/types';
import { FormMode, MovementType } from '../../common/enums';

const WorkoutListItem: React.FC<{ workout: IWorkout }> = ({ workout }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const deleteText = `Do you want to delete this workout: ${workout.name}?`;

  function handleDelete(): void {
    if (authUser) {
      firebase
        .workout(authUser.uid, workout.id)
        .delete()
        .then(() => console.log(`Workout Deleted: ${workout.name}`))
        .catch((err) => console.error(err));
    }
  }

  return (
    <WorkoutListItemWrapper>
      <div className="color-bar" />
      <p className="name">{workout.name}</p>
      <ListItemMenuButton
        type={MovementType.Workout}
        movement={workout}
        deleteText={deleteText}
        handleDelete={handleDelete}
      />
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled(ListItem)`
  /* height: ${(props) => props.theme.space[8]}; */
  /* height: 180px;
  width: 16rem; */
  grid-area: auto / auto / span 2 / span 2;
  .color-bar {
    background-color: ${(props) => props.theme.color.yellow[500]};
  }
`;

export default WorkoutListItem;
