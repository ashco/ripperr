import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import { InputField, exerciseFormVal } from '.';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';

import { IExercise, IExerciseFormValues } from '../../common/types';
import { FormMode, MovementType } from '../../common/enums';

const INITIAL_VALUES: IExerciseFormValues = {
  name: '',
  notes: '',
  tags: [],
};

const ExerciseForm: React.FC<{
  formMode: FormMode;
  hide: () => void;
  // exercise?: IExercise;
}> = ({ formMode, hide }) => {
  // }> = ({ hide, formMode, exercise }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  // ============ SET UP FORM STATE ============

  // let initialFormState;
  // if (formMode === FormMode.Edit && exercise) {
  //   initialFormState = exercise;
  // } else {
  const initialFormState = INITIAL_VALUES;
  // }

  const [form, setForm] = useState(initialFormState);

  // // ============ VALIDATION ============

  const isValid = true;
  // let isValidName = true;

  // if (exercise) {
  //   isValidName = name !== '' || name !== exercise.name;
  // }

  // isValid = isValidName;

  // // ============ TEXT VALUES ============

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

      // TODO - Check that exercise name is unique

      const exerciseObj: IExercise = {
        id: docRef.id,
        lastModified: firebase.getTimestamp(),
        type: MovementType.Exercise,
        name: values.name,
        notes: values.notes,
        tags: values.tags,
        history: [],
      };

      docRef
        .set(exerciseObj)
        .then(() => {
          console.log(`Exercise Added: ${exerciseObj.name}`);
          hide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser!');
    }
  }

  // function handleUpdate(values: IExerciseFormValues): void {
  //   if (authUser && exercise) {
  //     const { name } = values;

  //     firebase
  //       .exercise(authUser.uid, exercise.id)
  //       .update({
  //         name: name,
  //       })
  //       .then(() => {
  //         console.log(`Exercise Updated: ${name}`);
  //         hide();
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } else {
  //     console.log('There is no authUser || exercise!');
  //   }
  // }

  // // ============ FORM FUNCTIONS ============

  function handleChange(e: { target: { name: string; value: any } }): void {
    const { name, value } = e.target;
    const newForm = { ...form };
    newForm[name] = value;

    setForm(newForm);
  }

  function handleMultiSelectChange(e: { target: { options: any } }): void {
    const { options } = e.target;
    const tags = [];

    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        tags.push(options[i].value);
      }
    }

    setForm({ ...form, tags });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (formMode === FormMode.Add) {
      handleCreate(form);
      // } else if (formMode === FormMode.Edit) {
      //   handleUpdate(form);
    }
  }

  return (
    <ExerciseFormWrapper>
      <h1>{titleText}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="Burpees"
              value={form.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="notes">
            Notes
            <textarea
              name="notes"
              placeholder="Describe your exercise.."
              value={form.notes}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="tags">
            Tags
            <select
              multiple
              name="tags"
              value={form.tags}
              onChange={handleMultiSelectChange}
            >
              <option label="tag-1" value="tag-1" />
              <option label="tag-2" value="tag-2" />
            </select>
          </label>
        </div>
        <button type="submit" disabled={!isValid}>
          {submitButtonText}
        </button>
      </form>
    </ExerciseFormWrapper>
  );
};

const ExerciseFormWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default ExerciseForm;
