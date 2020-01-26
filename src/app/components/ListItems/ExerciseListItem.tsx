import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
// import { ListItemWrapper } from './ListItem';
import { DeleteButton, MovementFormButton } from '../Buttons';

import { IExercise } from '../../common/types';
import { FormMode } from '../../common/enums';

const ExerciseListItem: React.FC<{ exercise: IExercise }> = ({ exercise }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const deleteText = `Do you want to delete this exercise: ${exercise.name}?`;

  function handleDelete(): void {
    if (authUser) {
      firebase
        .exercise(authUser.uid, exercise.id)
        .delete()
        .then(() => console.log(`Exercise Deleted: ${exercise.name}`))
        .catch((err) => console.error(err));
    }
  }

  return (
    <ExerciseListItemWrapper>
      <div className="color-bar" />
      <span>
        {exercise.name}
        <DeleteButton text={deleteText} handleDelete={handleDelete} />
        <MovementFormButton formMode={FormMode.Edit} movement={exercise} />
      </span>
    </ExerciseListItemWrapper>
  );
};

const ExerciseListItemWrapper = styled(ListItem)`
  height: ${(props) => props.theme.space[8]};
  .color-bar {
    background-color: ${(props) => props.theme.color.green[500]};
  }
`;

export default ExerciseListItem;
