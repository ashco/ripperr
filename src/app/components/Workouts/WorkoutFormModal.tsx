import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { Formik, Form } from 'formik';

import { TextField, workoutFormVal } from '../Forms';
import { FormMode, IWorkout } from '../../common/types';

interface IWorkoutFormValues {
  name: string;
}

const INITIAL_VALUES: IWorkoutFormValues = {
  name: '',
  // TODO - Add in workoutType
};

const WorkoutFormModal: React.FC<{
  hide: () => void;
  mode: FormMode;
  workout?: IWorkout;
}> = ({ hide, mode, workout }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  // Form fill if in edit mode
  let initialFormState;
  if (mode === 'Edit' && workout) {
    initialFormState = workout;
  } else {
    initialFormState = INITIAL_VALUES;
  }

  // Only update if a value is different and none are blank.
  let isValid = true;
  let isValidName = true;

  if (workout) {
    isValidName = name !== '' || name !== workout.name;
  }

  isValid = isValidName;

  function handleCreate(values: IWorkoutFormValues): void {
    if (authUser) {
      const docRef = firebase.workouts(authUser.uid).doc();
      const { id } = docRef;

      const { name } = values;
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
  function handleUpdate(values: IWorkoutFormValues): void {
    if (authUser && workout) {
      const { name } = values;

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
    <Formik
      initialValues={initialFormState}
      validationSchema={workoutFormVal}
      onSubmit={(values) => {
        if (mode === 'Add') {
          handleCreate(values);
        } else if (mode === 'Edit') {
          handleUpdate(values);
        }
      }}
    >
      <WorkoutFormModalWrapper>
        <button onClick={hide}>Close</button>
        <h1>{titleText}</h1>
        <Form>
          <TextField
            label="Name"
            name="name"
            type="text"
            placeholder="Burpees"
          />
          <button disabled={!isValid}>{submitButtonText}</button>
        </Form>
      </WorkoutFormModalWrapper>
    </Formik>
    // <WorkoutFormModalWrapper>
    //   <button onClick={hide}>Close</button>
    //   <h1>{titleText}</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Name
    //       <input name="name" value={name} onChange={handleChange} type="text" />
    //     </label>
    //     <label>
    //       Exercise 1
    //       <select name="ex1" id="ex1">
    //         <option value=""></option>
    //       </select>
    //     </label>
    //     <button disabled={isInvalid} type="submit">
    //       {submitButtonText}
    //     </button>
    //   </form>
    // </WorkoutFormModalWrapper>
  );
};

const WorkoutFormModalWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default WorkoutFormModal;
