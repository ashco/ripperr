﻿import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';

import { Mode } from '../Buttons/ExerciseFormButton';
import { InterfaceExercise } from '../../pages/exercises';

interface InterfaceState {
  [key: string]: any;
  name: string;
}

const INITIAL_STATE: InterfaceState = {
  name: '',
  // TODO - Add in exerciseType
};

const ExerciseFormModal: React.FunctionComponent<{
  hide: () => void;
  mode: Mode;
  exercise?: InterfaceExercise;
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

  let isInvalidUpdate = false;
  if (mode === 'Edit' && exercise) {
    // There must be a change to be valid update
    isInvalidUpdate = name === exercise.name;
  }
  const isInvalid = isInvalidUpdate || name === '';

  function handleChange(e: { target: { name: string; value: any } }): void {
    const { name, value } = e.target;
    const newState = { ...state };
    newState[name] = value;
    setState(newState);
  }

  function handleCreate(): void {
    if (authUser) {
      firebase
        .exercise(authUser.uid, name)
        .set({
          name: name,
        })
        .then(() => {
          console.log(`Exercise Added: ${name}`);
          hide();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser!');
    }
  }

  function handleUpdate(): void {
    console.log('Updating!');
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
