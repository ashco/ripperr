import { useContext } from 'react';
import styled from 'styled-components';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { DeleteButton } from '../Buttons';

const ExerciseListItem = ({ exercise }: any) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const deleteText = 'Do you want to delete this exercise?';

  function handleDelete() {
    if (authUser) {
      firebase
        .exercise(authUser.uid, exercise.name)
        .delete()
        .then(() => console.log(`Deleted exercise ${exercise.name}`))
        .catch(err => console.error(err));
    }
  }

  return (
    <ExerciseListItemWrapper>
      <span>
        <strong>Exercise Name:</strong> {exercise.name}
        <DeleteButton text={deleteText} handleDelete={handleDelete} />
        {/* TODO - Write edit logic */}
        <button>Edit</button>
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
