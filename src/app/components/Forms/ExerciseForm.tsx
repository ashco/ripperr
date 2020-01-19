import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';

import { FirstFields } from './index';

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
  exercise?: IExercise;
}> = ({ formMode, hide, exercise }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  // ============ SET UP FORM STATE ============
  let initialFormState = INITIAL_VALUES;
  if (formMode === FormMode.Edit && exercise) {
    initialFormState = exercise;
  }

  const [form, setForm] = useState(initialFormState);

  // ============ VALIDATION ============

  const isValid = true;
  // let isValidName = true;

  // if (exercise) {
  //   isValidName = name !== '' || name !== exercise.name;
  // }

  // isValid = isValidName;

  // ============ TEXT VALUES ============

  const text = {
    title: '',
    submitButton: '',
  };
  if (formMode === FormMode.Add) {
    text.title = 'Create New Exercise';
    text.submitButton = 'Submit';
  } else if (formMode === FormMode.Edit) {
    text.title = 'Edit Exercise';
    text.submitButton = 'Update';
  }

  // ============ FIREBASE FUNCTIONS ============

  function handleCreateExercise(form: IExerciseFormValues): void {
    if (authUser) {
      const docRef = firebase.exercises(authUser.uid).doc();

      // TODO - Check that exercise name is unique

      const exerciseObj: IExercise = {
        id: docRef.id,
        lastModified: firebase.getTimestamp(),
        type: MovementType.Exercise,
        name: form.name,
        notes: form.notes,
        tags: form.tags,
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

  function handleUpdateExercise(form: IExerciseFormValues): void {
    if (authUser && exercise) {
      const exerciseObj: IExerciseFormValues = {
        lastModified: firebase.getTimestamp(),
        name: form.name,
        notes: form.notes,
        tags: form.tags,
      };

      firebase
        .exercise(authUser.uid, exercise.id)
        .update(exerciseObj)
        .then(() => {
          console.log(`Exercise Updated: ${exerciseObj.name}`);
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
      handleCreateExercise(form);
    } else if (formMode === FormMode.Edit) {
      handleUpdateExercise(form);
    }
  }

  return (
    <ExerciseFormWrapper>
      <h1>{text.title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <FirstFields
            form={form}
            handleChange={handleChange}
            handleMultiSelectChange={handleMultiSelectChange}
          />
          {/* <label htmlFor="name">
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
          </label> */}
        </div>
        <button type="submit" disabled={!isValid}>
          {text.submitButton}
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
