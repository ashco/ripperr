import React, { useContext } from 'react';
import styled from 'styled-components';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { DeleteButton } from '../Buttons';
import { ExerciseFormButton } from '../Exercises';

import { IExercise } from '../../common/types';

const ExerciseListItem: React.FC<{
  exercise: IExercise;
}> = ({ exercise }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const deleteText = 'Do you want to delete this exercise?';

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
      <span>
        <strong>Exercise Name:</strong> {exercise.name}
        <DeleteButton text={deleteText} handleDelete={handleDelete} />
        <ExerciseFormButton mode="Edit" exercise={exercise} />
      </span>
    </ExerciseListItemWrapper>
  );
};

const ExerciseListItemWrapper = styled.li`
  height: 200px;
  width: 400px;
  background: #eee;
  margin-bottom: 2rem;
`;

export default ExerciseListItem;
