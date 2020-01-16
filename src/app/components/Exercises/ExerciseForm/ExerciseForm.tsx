import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import { InputField, exerciseFormVal } from '../../Forms';
import { FirebaseContext } from '../../Firebase';
import { AuthUserContext } from '../../Session';
import { IExercise, IExerciseFormValues } from '../../../common/types';
import { FormMode } from '../../../common/enums';

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

  // ============ SET UP FORM STATE ============

  let initialFormState;
  if (formMode === FormMode.Edit && exercise) {
    initialFormState = exercise;
  } else {
    initialFormState = INITIAL_VALUES;
  }

  const [form, setForm] = useState(initialFormState);

  // ============ VALIDATION ============

  let isValid = true;
  let isValidName = true;

  if (exercise) {
    isValidName = name !== '' || name !== exercise.name;
  }

  isValid = isValidName;

  // ============ TEXT VALUES ============

  let titleText;
  let submitButtonText;
  if (formMode === FormMode.Add) {
    titleText = 'Create New Exercise';
    submitButtonText = 'Submit';
  } else if (formMode === FormMode.Edit) {
    titleText = 'Edit Exercise';
    submitButtonText = 'Update';
  }

  // ============ FIREBASE FUNCTIONS ============

  function handleCreate(values: IExerciseFormValues): void {
    if (authUser) {
      const docRef = firebase.exercises(authUser.uid).doc();
      const { id } = docRef;

      const { name } = values;

      // TODO - Check that exercise name is unique

      docRef
        .set({
          exId: id,
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

  function handleUpdate(values: IExerciseFormValues): void {
    if (authUser && exercise) {
      const { name } = values;

      firebase
        .exercise(authUser.uid, exercise.exId)
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

  // ============ FORM FUNCTIONS ============

  function handleChange(e: { target: { name: string; value: any } }): void {
    const { name, value } = e.target;
    const newForm = { ...form };
    newForm[name] = value;

    setForm(newForm);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (formMode === FormMode.Add) {
      handleCreate(form);
    } else if (formMode === FormMode.Edit) {
      handleUpdate(form);
    }
  }

  return (
    <ExerciseFormWrapper>
      <button onClick={hide}>Close</button>
      <h1>{titleText}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Exercise Name
            <input
              type="text"
              name="name"
              placeholder="Burpees"
              value={form.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" disabled={!isValid}>
          {submitButtonText}
        </button>
      </form>
    </ExerciseFormWrapper>
    // <Formik
    //   initialValues={initialFormState}
    //   validationSchema={exerciseFormVal}
    //   onSubmit={(values) => {
    //     if (formMode === 'Add') {
    //       handleCreate(values);
    //     } else if (formMode === 'Edit') {
    //       handleUpdate(values);
    //     }
    //   }}
    // >
    //   <ExerciseFormWrapper>
    //     <button onClick={hide}>Close</button>
    //     <h1>{titleText}</h1>
    //     <Form>
    //       <InputField
    //         label="Name"
    //         name="name"
    //         type="text"
    //         placeholder="Burpees"
    //       />
    //       <button disabled={!isValid}>{submitButtonText}</button>
    //     </Form>
    //   </ExerciseFormWrapper>
    // </Formik>
  );
};

const ExerciseFormWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default ExerciseForm;
