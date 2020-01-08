﻿import React, { useContext } from 'react';
import styled from 'styled-components';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { DeleteButton, WorkoutFormButton } from '../Buttons';
import { IWorkout } from '../../pages/workouts';

const WorkoutListItem: React.FunctionComponent<{
  workout: IWorkout;
}> = ({ workout }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const deleteText = 'Do you want to delete this workout?';

  function handleDelete(): void {
    if (authUser) {
      firebase
        .workout(authUser.uid, workout.id)
        .delete()
        .then(() => console.log(`Workout Deleted: ${workout.name}`))
        .catch(err => console.error(err));
    }
  }

  return (
    <WorkoutListItemWrapper>
      <span>
        <strong>Workout Name:</strong> {workout.name}
        <DeleteButton text={deleteText} handleDelete={handleDelete} />
        <WorkoutFormButton mode="Edit" workout={workout} />
      </span>
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled.li`
  height: 200px;
  width: 400px;
  background: #eee;
  margin-bottom: 2rem;
`;

export default WorkoutListItem;