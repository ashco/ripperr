import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { RepsField, RestField } from '../Forms';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';

import { IWorkout, IWorkoutFormValues } from '../../common/types';
import { FormMode, WorkoutMode, MovementType } from '../../common/enums';

const INITIAL_VALUES: IWorkoutFormValues = {
  name: '',
  notes: '',
  tags: [],
  mode: WorkoutMode.Reps,
  movements: [
    {
      id: '',
      config: {},
    },
  ],
  rest: {
    automatic: true,
    inner: 45,
    outer: 60,
  },
  config: {},
};

const WorkoutForm: React.FC<{
  formMode: FormMode;
  hide: () => void;
  // exercise?: IWorkout;
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
    titleText = 'Create New Workout';
    submitButtonText = 'Submit';
  } else if (formMode === FormMode.Edit) {
    titleText = 'Edit Workout';
    submitButtonText = 'Update';
  }

  // ============ FIREBASE FUNCTIONS ============

  function handleCreateWorkout(values: IWorkoutFormValues): void {
    if (authUser) {
      const docRef = firebase.workouts(authUser.uid).doc();

      // TODO - Check that workout name is unique

      const workoutObj: IWorkout = {
        id: docRef.id,
        lastModified: firebase.getTimestamp(),
        type: MovementType.Workout,
        name: values.name,
        notes: values.notes,
        tags: values.tags,
        history: [],
        mode: values.mode,
        movements: values.movements,
        rest: values.rest,
        config: {},
      };

      docRef
        .set(workoutObj)
        .then(() => {
          console.log(`Workout Added: ${workoutObj.name}`);
          hide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser!');
    }
  }

  // function handleUpdate(values: IWorkoutFormValues): void {
  //   if (authUser && workout) {
  //     const { name } = values;

  //     firebase
  //       .workout(authUser.uid, workout.id)
  //       .update({
  //         name: name,
  //       })
  //       .then(() => {
  //         console.log(`Workout Updated: ${name}`);
  //         hide();
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } else {
  //     console.log('There is no authUser || workout!');
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
      handleCreateWorkout(form);
      // } else if (formMode === FormMode.Edit) {
      //   handleUpdate(form);
    }
  }

  function handleAddEx(): void {
    const newForm = { ...form };
    const newExercise = {
      id: '',
      config: {},
    };

    newForm.movements.push(newExercise);
    setForm(newForm);
  }

  function handleDeleteEx(exIndex: number): void {
    const newForm = { ...form };

    newForm.movements.splice(exIndex, 1);
    setForm(newForm);
  }

  return (
    <WorkoutFormWrapper>
      <h1>{titleText}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {/* NAME */}
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="Total Body"
              value={form.name}
              onChange={handleChange}
            />
          </label>
          {/* NOTES */}
          <label htmlFor="notes">
            Notes
            <textarea
              name="notes"
              placeholder="Describe your workout.."
              value={form.notes}
              onChange={handleChange}
            />
          </label>
          {/* TAGS */}
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
          {/* MODE */}
          <label htmlFor="mode">
            Mode
            <input type="radio" name="mode" value={WorkoutMode.Reps} />
            <input type="radio" name="mode" value={WorkoutMode.Timed} />
          </label>
          {/* EXERCISES */}
          {form.mode === WorkoutMode.Reps &&
            form.movements &&
            form.movements.map((move, i) => (
              <RepsField
                move={move}
                i={i}
                key={i}
                handleChange={handleChange}
                handleDeleteEx={handleDeleteEx}
              />
            ))}
          {/* REST */}
          <RestField rest={form.rest} handleChange={handleChange} />
        </div>
        <button type="submit" disabled={!isValid}>
          {submitButtonText}
        </button>
      </form>
    </WorkoutFormWrapper>
  );
};

const WorkoutFormWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default WorkoutForm;
