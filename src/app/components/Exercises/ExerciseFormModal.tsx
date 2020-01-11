import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import { TextField, exerciseFormVal } from '../Forms';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { FormMode, IExercise } from '../../common/types';

interface IExerciseFormValues {
  [key: string]: any;
  name: string;
}

const INITIAL_VALUES: IExerciseFormValues = {
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

  // Form fill exercise if in edit mode
  let initialFormState;
  if (mode === 'Edit' && exercise) {
    initialFormState = exercise;
    // validUpdate = name !== exercise.name;
  } else {
    initialFormState = INITIAL_VALUES;
  }

  // Only update if a value is different and none are blank.
  let isValid = true;
  let isValidName = true;

  if (exercise) {
    isValidName = name !== '' || name !== exercise.name;
  }

  isValid = isValidName;

  function handleCreate(values: IExerciseFormValues): void {
    if (authUser) {
      const docRef = firebase.exercises(authUser.uid).doc();
      const { id } = docRef;

      const { name } = values;

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

  // // TODO - Fix memory leak issue that occurs on update
  function handleUpdate(values: IExerciseFormValues): void {
    if (authUser && exercise) {
      const { name } = values;

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
    <Formik
      initialValues={initialFormState}
      validationSchema={exerciseFormVal}
      onSubmit={(values) => {
        if (mode === 'Add') {
          handleCreate(values);
        } else if (mode === 'Edit') {
          handleUpdate(values);
        }
      }}
    >
      <ExerciseFormModalWrapper>
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
      </ExerciseFormModalWrapper>
    </Formik>
  );
};

const ExerciseFormModalWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default ExerciseFormModal;
