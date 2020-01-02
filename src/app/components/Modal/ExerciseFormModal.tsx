import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';

import { Mode } from '../Buttons/ExerciseFormButton';

interface InterfaceState {
  [key: string]: any;
  exerciseName: string;
}

const INITIAL_STATE: InterfaceState = {
  exerciseName: '',
  // TODO - Add in exerciseType
};

const ExerciseFormModal: React.FunctionComponent<{
  hide: () => void;
  mode: Mode;
}> = ({ hide, mode }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const [state, setState] = useState(INITIAL_STATE);

  const { exerciseName } = state;
  const isInvalid = exerciseName === '';

  function handleChange(e: { target: { name: string; value: any } }): void {
    const { name, value } = e.target;
    const newState = { ...state };
    newState[name] = value;
    setState(newState);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (authUser) {
      firebase
        .exercise(authUser.uid, exerciseName)
        .set({
          name: exerciseName,
        })
        .then(() => {
          console.log(`Exercise Added: ${exerciseName}`);
          hide();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser!');
    }
  }

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
          <input
            name="exerciseName"
            value={exerciseName}
            onChange={handleChange}
            type="text"
          />
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
