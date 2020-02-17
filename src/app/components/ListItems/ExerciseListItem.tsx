import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
// import { ListItemWrapper } from './ListItem';
import {
  // DeleteButton,
  // MovementFormButton,
  ListItemMenuButton,
} from '../Buttons';

import { Exercise } from '../../common/types';
import { MovementType } from '../../common/enums';

const ExerciseListItem: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const themeContext = useContext(ThemeContext);

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
    <ExerciseListItemWrapper color={themeContext.color.blue[500]}>
      <p className="name">{exercise.name}</p>
      <ListItemMenuButton
        type={MovementType.Exercise}
        movement={exercise}
        deleteText={deleteText}
        handleDelete={handleDelete}
      />
    </ExerciseListItemWrapper>
  );
};

const ExerciseListItemWrapper = styled(ListItem)``;

export default ExerciseListItem;
