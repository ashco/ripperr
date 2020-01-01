import React, { useState, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FirebaseContext } from '../Firebase';

interface InterfaceState {
  [key: string]: any;
  exerciseName: string;
}

const INITIAL_STATE: InterfaceState = {
  exerciseName: '',
};

const ExercisesForm = ({ hide }: any) => {
  const firebase = useContext(FirebaseContext);
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

    const authUser = firebase.auth.currentUser;
    if (authUser) {
      firebase.exercise(authUser.uid, exerciseName).set({
        name: exerciseName,
      });
    }
  }

  return (
    <ExercisesFormWrapper>
      <button onClick={hide}>Close</button>
      <h1>Create New Exercise</h1>
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
          Submit
        </button>
      </form>
    </ExercisesFormWrapper>
  );
};

const ExercisesFormWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default ExercisesForm;
