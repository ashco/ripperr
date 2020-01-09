import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { FormMode, IExercise } from '../../common/types';

interface IState {
  [key: string]: any;
  name: string;
}

const INITIAL_STATE: IState = {
  name: '',
  // TODO - Add in exerciseType
};

const ExerciseFormModal: React.FC<{
  hide: () => void;
  mode: FormMode;
  exercise?: IExercise;
}> = ({ hide, mode, exercise }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  let initialState;

  if (mode === 'Edit' && exercise) {
    initialState = exercise;
  } else {
    initialState = INITIAL_STATE;
  }

  const [state, setState] = useState(initialState);
  const { name } = state;

  // There must be a change to be valid update
  let isInvalidUpdate = false;
  if (mode === 'Edit' && exercise) {
    isInvalidUpdate = name === exercise.name;
  }
  const isInvalid = isInvalidUpdate || name === '';

  function handleChange(e: { target: { name: string; value: any } }): void {
    const newState = { ...state };
    newState[e.target.name] = e.target.value;
    setState(newState);
  }

  function handleCreate(): void {
    if (authUser) {
      const docRef = firebase.exercises(authUser.uid).doc();
      const { id } = docRef;

      // TODO - Check that exercise name is unique

      docRef
        .set({
          id,
          name,
        })
        .then(() => {
          console.log(`Exercise Added: ${name}`);
          hide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser!');
    }
  }

  // TODO - Fix memory leak issue that occurs on update
  function handleUpdate(): void {
    if (authUser && exercise) {
      firebase
        .exercise(authUser.uid, exercise.id)
        .update({
          name: name,
        })
        .then(() => {
          console.log(`Exercise Updated: ${name}`);
          hide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser || exercise!');
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (mode === 'Add') {
      handleCreate();
    } else if (mode === 'Edit') {
      handleUpdate();
    }
  }

  // Text assignment for different modes
  let titleText;
  let submitButtonText;
  if (mode === 'Add') {
    titleText = 'Create New Exercise';
    submitButtonText = 'Submit';
  } else if (mode === 'Edit') {
    titleText = 'Edit Exercise';
    submitButtonText = 'Update';
  }

  return (
    <ExerciseFormModalWrapper>
      <button onClick={hide}>Close</button>
      <h1>{titleText}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={name} onChange={handleChange} type="text" />
        </label>
        <button disabled={isInvalid} type="submit">
          {submitButtonText}
        </button>
      </form>
    </ExerciseFormModalWrapper>
  );
};

const ExerciseFormModalWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default ExerciseFormModal;
