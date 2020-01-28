import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
import { Button, DeleteButton, MovementFormButton } from '../Buttons';

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
      <div className="btn-container">
        <span className="row">
          <DeleteButton text={deleteText} handleDelete={handleDelete} />
          <MovementFormButton formMode={FormMode.Edit} movement={workout} />
        </span>
        <span className="row">
          <Button>Rip Rip</Button>
        </span>
      </div>
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled(ListItem)`
  /* height: ${(props) => props.theme.space[8]}; */
  .color-bar {
    background-color: ${(props) => props.theme.color.yellow[500]};
  }
`;

export default WorkoutListItem;
