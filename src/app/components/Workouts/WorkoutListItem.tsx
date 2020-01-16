import React, { useContext } from 'react';
import styled from 'styled-components';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { DeleteButton } from '../Buttons';
import { WorkoutFormButton } from '../Workouts';

import { IWorkout, IExercise } from '../../common/types';
import { FormMode } from '../../common/enums';

const WorkoutListItem: React.FunctionComponent<{
  workout: IWorkout;
  exercises: IExercise[];
}> = ({ workout, exercises }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const deleteText = 'Do you want to delete this workout?';

  function handleDelete(): void {
    if (authUser) {
      firebase
        .workout(authUser.uid, workout.woId)
        .delete()
        .then(() => console.log(`Workout Deleted: ${workout.name}`))
        .catch((err) => console.error(err));
    }
  }

  return (
    <WorkoutListItemWrapper>
      <span>
        <strong>Workout Name:</strong> {workout.name}
        <DeleteButton text={deleteText} handleDelete={handleDelete} />
        <WorkoutFormButton
          formMode={FormMode.Edit}
          workout={workout}
          exercises={exercises}
        />
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
