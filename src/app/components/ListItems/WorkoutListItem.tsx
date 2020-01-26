import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
import { DeleteButton, MovementFormButton } from '../Buttons';

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
      <div className="color-bar" />
      <p className="name">{workout.name}</p>
      <span className="btn-row">
        <DeleteButton text={deleteText} handleDelete={handleDelete} />
        <MovementFormButton formMode={FormMode.Edit} movement={workout} />
      </span>
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled(ListItem)`
  height: ${(props) => props.theme.space[9]};
  .color-bar {
    background-color: ${(props) => props.theme.color.yellow[500]};
  }
`;

export default WorkoutListItem;
