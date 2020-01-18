import React, { useContext } from 'react';
import styled from 'styled-components';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';

import { ListItem } from './index';
import { DeleteButton } from '../Buttons';

import { IWorkout } from '../../common/types';

const WorkoutListItem: React.FC<{ workout: IWorkout }> = ({ workout }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const text = `Do you want to delete this workout: ${workout.name}?`;

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
      <span>
        <strong>Workout: </strong>
        {workout.name}
        <DeleteButton text={text} handleDelete={handleDelete} />
      </span>
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled(ListItem)`
  height: 200px;
  background: orange;
`;

export default WorkoutListItem;
