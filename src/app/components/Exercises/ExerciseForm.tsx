import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import { InputField, exerciseFormVal } from '../Forms';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { FormMode, IExercise } from '../../common/types';

interface IExerciseFormValues {
  name: string;
}

const INITIAL_VALUES: IExerciseFormValues = {
  name: '',
  // TODO - Add in exerciseType
};

const ExerciseForm: React.FC<{
  hide: () => void;
  formMode: FormMode;
  exercise?: IExercise;
}> = ({ hide, formMode, exercise }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  // Form fill if in edit formMode
  let initialFormState;
  if (formMode === 'Edit' && exercise) {
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
          exerciseId: id,
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
        .exercise(authUser.uid, exercise.exerciseId)
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

  // Text assignment for different formModes
  let titleText;
  let submitButtonText;
  if (formMode === 'Add') {
    titleText = 'Create New Exercise';
    submitButtonText = 'Submit';
  } else if (formMode === 'Edit') {
    titleText = 'Edit Exercise';
    submitButtonText = 'Update';
  }

  return (
    <Formik
      initialValues={initialFormState}
      validationSchema={exerciseFormVal}
      onSubmit={(values) => {
        if (formMode === 'Add') {
          handleCreate(values);
        } else if (formMode === 'Edit') {
          handleUpdate(values);
        }
      }}
    >
      <ExerciseFormWrapper>
        <button onClick={hide}>Close</button>
        <h1>{titleText}</h1>
        <Form>
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Burpees"
          />
          <button disabled={!isValid}>{submitButtonText}</button>
        </Form>
      </ExerciseFormWrapper>
    </Formik>
  );
};

const ExerciseFormWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default ExerciseForm;
