import React, { useState, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FirebaseContext } from '../Firebase';

interface InterfaceState {
  [key: string]: any;
  exName: string;
}

const INITIAL_STATE: InterfaceState = {
  exName: '',
};

const ExercisesForm = ({ hide }: any) => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState(INITIAL_STATE);

  const { exName } = state;
  const isInvalid = exName === '';

  function handleChange(e: { target: { name: string; value: any } }): void {
    const { name, value } = e.target;
    const newState = { ...state };
    newState[name] = value;
    console.log(newState);
    setState(newState);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  return (
    <ExercisesFormWrapper>
      <button onClick={hide}>Close</button>
      <h1>Create New Exercise</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="exName"
            value={exName}
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
