import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';

import { Mode } from './WorkoutFormButton';
import { IWorkout } from '../../common/types';

interface IState {
  [key: string]: any;
  name: string;
}

const INITIAL_STATE: IState = {
  name: '',
  // TODO - Add in workoutType
};

const WorkoutFormModal: React.FC<{
  hide: () => void;
  mode: Mode;
  workout?: IWorkout;
}> = ({ hide, mode, workout }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  let initialState;

  if (mode === 'Edit' && workout) {
    initialState = workout;
  } else {
    initialState = INITIAL_STATE;
  }

  const [state, setState] = useState(initialState);
  const { name } = state;

  // There must be a change to be valid update
  let isInvalidUpdate = false;
  if (mode === 'Edit' && workout) {
    isInvalidUpdate = name === workout.name;
  }
  const isInvalid = isInvalidUpdate || name === '';

  function handleChange(e: { target: { name: string; value: any } }): void {
    const newState = { ...state };
    newState[e.target.name] = e.target.value;
    setState(newState);
  }

  function handleCreate(): void {
    if (authUser) {
      const docRef = firebase.workouts(authUser.uid).doc();
      const { id } = docRef;

      // TODO - Check that workout name is unique

      docRef
        .set({
          id,
          name,
        })
        .then(() => {
          console.log(`Workout Added: ${name}`);
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
    if (authUser && workout) {
      firebase
        .workout(authUser.uid, workout.id)
        .update({
          name,
        })
        .then(() => {
          console.log(`Workout Updated: ${name}`);
          hide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser || workout!');
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
    titleText = 'Create New Workout';
    submitButtonText = 'Submit';
  } else if (mode === 'Edit') {
    titleText = 'Edit Workout';
    submitButtonText = 'Update';
  }

  return (
    <WorkoutFormModalWrapper>
      <button onClick={hide}>Close</button>
      <h1>{titleText}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={name} onChange={handleChange} type="text" />
        </label>
        <label>
          Exercise 1
          <select name="ex1" id="ex1">
            <option value=""></option>
          </select>
        </label>
        <button disabled={isInvalid} type="submit">
          {submitButtonText}
        </button>
      </form>
    </WorkoutFormModalWrapper>
  );
};

const WorkoutFormModalWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default WorkoutFormModal;
