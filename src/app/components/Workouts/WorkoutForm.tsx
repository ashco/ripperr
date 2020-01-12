import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { Formik, Form } from 'formik';

import WorkoutModeFormFields from './WorkoutModeFormFields';
import { InputField, SelectField, workoutFormVal } from '../Forms';
import { FormMode, IWorkoutFormValues, IWorkout } from '../../common/types';

const INITIAL_VALUES: IWorkoutFormValues = {
  name: '',
  workoutMode: '',
};

const WorkoutForm: React.FC<{
  hide: () => void;
  formMode: FormMode;
  workout?: IWorkout;
}> = ({ hide, formMode, workout }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  // Form fill if in edit formMode
  let initialFormState;
  if (formMode === 'Edit' && workout) {
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

  // Text assignment for different formModes
  let titleText;
  let submitButtonText;
  if (formMode === 'Add') {
    titleText = 'Create New Workout';
    submitButtonText = 'Submit';
  } else if (formMode === 'Edit') {
    titleText = 'Edit Workout';
    submitButtonText = 'Update';
  }

  return (
    <Formik
      initialValues={initialFormState}
      validationSchema={workoutFormVal}
      onSubmit={(values) => {
        if (formMode === 'Add') {
          handleCreate(values);
        } else if (formMode === 'Edit') {
          handleUpdate(values);
        }
      }}
    >
      <WorkoutFormWrapper>
        <button onClick={hide}>Close</button>
        <h1>{titleText}</h1>
        <Form>
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Push + Pull"
          />
          <SelectField
            label="Workout Mode"
            name="workoutMode"
            options={[
              { label: 'Reps + Sets', value: 'reps-sets' },
              { label: 'Tabata', value: 'tabata' },
            ]}
          />
          <WorkoutModeFormFields />

          <button disabled={!isValid}>{submitButtonText}</button>
        </Form>
      </WorkoutFormWrapper>
    </Formik>
  );
};

const WorkoutFormWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default WorkoutForm;
