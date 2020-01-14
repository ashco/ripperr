import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../../Firebase';
import { AuthUserContext } from '../../Session';

import { withExercises, ExercisesContext } from '../../Exercises';

import WorkoutModeFormFields, {
  RepsSetsFormRow,
} from '../WorkoutModeFormFields';
import { InputField, SelectField, workoutFormVal } from '../../Forms';
import { FormMode, IWorkoutFormValues, IWorkout } from '../../../common/types';

const INITIAL_VALUES: IWorkoutFormValues = {
  name: '',
  mode: '',
  exercises: [
    {
      exId: '',
      sets: '0',
      reps: '0',
    },
  ],
};

const WorkoutForm: React.FC<{
  hide: () => void;
  formMode: FormMode;
  workout?: IWorkout;
}> = ({ hide, formMode, workout }) => {
  // ============ LOAD CONTEXT VARS ============
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const { exercises, exLoading } = useContext(ExercisesContext);

  // ============ SET UP FORM STATE ============
  let initialFormState;
  if (formMode === 'Edit' && workout) {
    initialFormState = workout;
  } else {
    initialFormState = INITIAL_VALUES;
  }

  const [form, setForm] = useState(initialFormState);

  // ============ VALIDATION ============
  // Check that name is valid
  const isValidName = form.name !== '';
  const isValidMode = form.mode !== '';
  const isValidExercises = form.exercises.every((ex) => {
    const hasId = ex.exId !== '';
    const hasReps = parseInt(ex.reps) > 0;
    const hasSets = parseInt(ex.sets) > 0;

    return hasId && hasReps && hasSets;
  });

  let isValidUpdate = true;
  // Check that there has been a change from previous workout
  if (workout) {
    const nameUpdate = form.name !== workout.name;
    const modeUpdate = form.mode !== workout.mode;

    // TODO - Get this to work correctly
    const exUpdate = form.exercises.some((ex, i) => {
      const workoutEx = workout.exercises[i];

      const idUpdate = ex.exId !== workoutEx.exId;
      const repsUpdate = ex.reps !== workoutEx.reps;
      const setsUpdate = ex.sets !== workoutEx.sets;

      return idUpdate || repsUpdate || setsUpdate;
    });

    const lengthUpdate = form.exercises.length !== workout.exercises.length;

    isValidUpdate = nameUpdate || modeUpdate || exUpdate || lengthUpdate;
  }
  // Check that there is at least 1 exercise
  const isValidExLength = form.exercises.length > 0;

  const isValid =
    isValidName &&
    isValidMode &&
    isValidExercises &&
    isValidUpdate &&
    isValidExLength;

  // ============ TEXT VALUES ============

  let titleText;
  let submitButtonText;
  if (formMode === 'Add') {
    titleText = 'Create New Workout';
    submitButtonText = 'Submit';
  } else if (formMode === 'Edit') {
    titleText = 'Edit Workout';
    submitButtonText = 'Update';
  }

  // ============ COMPONENT FUNCTIONS ============

  function handleCreate(values: IWorkoutFormValues): void {
    if (authUser) {
      const docRef = firebase.workouts(authUser.uid).doc();
      const { id } = docRef;

      // TODO - Check that workout name is unique
      const { name } = values;

      docRef
        .set({
          woId: id,
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

  function handleUpdate(values: IWorkoutFormValues): void {
    if (authUser && workout) {
      firebase
        .workout(authUser.uid, workout.woId)
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

  // function handleAddField(): void {
  // setExFieldCount(exFieldCount + 1);
  // console.log(exFieldCount);
  // }

  function handleChange(
    exIndex: number | undefined,
    e: { target: { name: string; value: any } },
  ): void {
    const { name, value } = e.target;
    const newForm = { ...form };

    // Sets exercise object
    if (exIndex !== undefined) {
      newForm.exercises[exIndex][name] = value;
    } else {
      newForm[name] = value;
    }
    setForm(newForm);
  }

  /**
   * Determine if creating or updating existing workout
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (formMode === 'Add') {
      handleCreate(form);
    } else if (formMode === 'Edit') {
      handleUpdate(form);
    }
  }

  function handleExAdd(): void {
    const newForm = { ...form };
    const newExercise = {
      exId: '',
      sets: '0',
      reps: '0',
    };

    newForm.exercises.push(newExercise);
    setForm(newForm);
  }

  function handleExDelete(exIndex: number): void {
    const newForm = { ...form };

    newForm.exercises.splice(exIndex, 1);
    setForm(newForm);
  }

  return (
    <WorkoutFormWrapper>
      <button onClick={hide}>Close</button>
      <h1>{titleText}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Workout Name
            <input
              type="text"
              name="name"
              placeholder="Body Weight Tabata"
              value={form.name}
              onChange={handleChange.bind(null, undefined)}
            />
          </label>
        </div>
        <div>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange.bind(null, undefined)}
          >
            <option label="Select a workout mode" value="" />
            <option label="Reps + Sets" value="reps-sets" />
            <option label="Tabata" value="tabata" />
          </select>
        </div>
        {form.mode !== '' &&
          form.exercises &&
          form.exercises.map((ex, i) => (
            <div key={i}>
              <div>
                <label htmlFor={`exercise-${i}`}>
                  {`Exercise ${i + 1}`}
                  <select
                    name="exId"
                    onChange={handleChange.bind(null, i)}
                    value={form.exercises[i].exId}
                  >
                    <option
                      label={exLoading ? 'loading...' : 'Select an exercise'}
                      value=""
                    />
                    {exercises.map((ex) => (
                      <option label={ex.name} value={ex.exId} key={ex.exId} />
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label htmlFor="reps">
                  <input
                    name="reps"
                    type="number"
                    placeholder="0"
                    value={form.exercises[i].reps}
                    onChange={handleChange.bind(null, i)}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="sets">
                  <input
                    name="sets"
                    type="number"
                    placeholder="0"
                    value={form.exercises[i].sets}
                    onChange={handleChange.bind(null, i)}
                  />
                </label>
              </div>
              <button type="button" onClick={(): void => handleExDelete(i)}>
                -
              </button>
            </div>
          ))}
        {form.mode !== '' && (
          <button type="button" onClick={handleExAdd}>
            +
          </button>
        )}
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

export default withExercises(WorkoutForm);
