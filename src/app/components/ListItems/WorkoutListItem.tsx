import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
import { DeleteButton } from '../Buttons';
import { MovementFormButton } from '../Movements';

import { IWorkout } from '../../common/types';
import { FormMode } from '../../common/enums';

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
      <span>
        <strong>Workout: </strong>
        {workout.name}
        <DeleteButton text={deleteText} handleDelete={handleDelete} />
        <MovementFormButton formMode={FormMode.Edit} movement={workout} />
      </span>
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled(ListItem)`
  height: 200px;
  background: orange;
`;

export default WorkoutListItem;
