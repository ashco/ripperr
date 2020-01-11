import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { Formik, Form } from 'formik';

import { InputField, SelectField, workoutFormVal } from '../Forms';
import { FormMode, IWorkoutFormValues, IWorkout } from '../../common/types';

const INITIAL_VALUES: IWorkoutFormValues = {
  name: '',
  type: '',
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

      // TODO - Check that workout name is unique

      docRef
        .set({
          id,
          ...values,
        })
        .then(() => {
          console.log(`Workout Added: ${values.name}`);
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
      firebase
        .workout(authUser.uid, workout.id)
        .update(values)
        .then(() => {
          console.log(`Workout Updated: ${values.name}`);
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
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Burpees"
          />
          <SelectField
            label="Type"
            name="type"
            placeholder="Sets"
            options={['reps-sets', 'circuit']}
          />
          {/* <label htmlFor="type">
            <div>Type</div>
            <select {...field} {...props}>
              <option label="" value="" />
              <option label="Reps + Sets" value="reps-sets" />
              <option label="Circuit" value="circuit" />
            </select>
            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
          </label> */}
          <button disabled={!isValid}>{submitButtonText}</button>
        </Form>
      </WorkoutFormModalWrapper>
    </Formik>
  );
};

const WorkoutFormModalWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default WorkoutFormModal;
