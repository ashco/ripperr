import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../../Firebase';
import { AuthUserContext } from '../../Session';

import { withExercises, ExercisesContext } from '../../Exercises';
import { WorkoutsContext, RepsSetsField } from '../index';

import { workoutModeOptions } from '../../../common/data';

import {
  IWorkoutFormValues,
  IWorkout,
  IFormError,
} from '../../../common/types';
import { FormMode, WorkoutMode } from '../../../common/enums';

const WorkoutForm: React.FC<{
  hide: () => void;
  formMode: FormMode;
  workout?: IWorkout;
}> = ({ hide, formMode, workout }) => {
  // ============ LOAD CONTEXT ============
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const { workouts, woLoading } = useContext(WorkoutsContext);

  // ============ SET UP FORM STATE ============
  const INITIAL_VALUES: IWorkoutFormValues = {
    name: '',
    mode: WorkoutMode._,
    exercises: [
      {
        exId: '',
        sets: 0,
        reps: 0,
      },
    ],
  };

  let initialFormState;
  if (formMode === FormMode.Edit && workout) {
    initialFormState = workout;
  } else {
    initialFormState = { ...INITIAL_VALUES };
  }

  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState<null | IFormError>(null);

  // ============ VALIDATION ============
  const isValidName = form.name !== '';
  const isValidMode = form.mode !== WorkoutMode._;
  const isValidExercises = form.exercises.every((ex) => {
    const hasId = ex.exId !== '';
    const hasReps = ex.reps > 0;
    const hasSets = ex.sets > 0;

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
  if (formMode === FormMode.Add) {
    titleText = 'Create New Workout';
    submitButtonText = 'Submit';
  } else if (formMode === FormMode.Edit) {
    titleText = 'Edit Workout';
    submitButtonText = 'Update';
  }

  // ============ FIREBASE FUNCTIONS ============

  function handleCreate(values: IWorkoutFormValues): void {
    if (authUser) {
      const docRef = firebase.workouts(authUser.uid).doc();
      const { id } = docRef;

      const workoutNames = workouts.map((wo) => wo.name.toLowerCase());
      if (workoutNames.includes(values.name.toLowerCase())) {
        setError({ message: 'Workout name already in use.' });
        return;
      }

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
      setError({
        message: 'There is no authUser!',
      });
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

  // ============ FORM FUNCTIONS ============

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

    if (formMode === FormMode.Add) {
      handleCreate(form);
    } else if (formMode === FormMode.Edit) {
      handleUpdate(form);
    }
  }

  function handleAddEx(): void {
    const newForm = { ...form };
    const newExercise = {
      exId: '',
      sets: 0,
      reps: 0,
    };

    newForm.exercises.push(newExercise);
    setForm(newForm);
  }

  function handleDeleteEx(exIndex: number): void {
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
          <label htmlFor="mode">
            Workout Mode
            <select
              name="mode"
              value={form.mode}
              onChange={handleChange.bind(null, undefined)}
            >
              {workoutModeOptions.map((option, i) => (
                <option label={option.label} value={option.value} key={i} />
              ))}
            </select>
          </label>
        </div>
        {form.mode === WorkoutMode.repsSets &&
          form.exercises &&
          form.exercises.map((formEx, i) => (
            <RepsSetsField
              formEx={formEx}
              i={i}
              key={i}
              handleChange={handleChange}
              handleDeleteEx={handleDeleteEx}
            />
          ))}
        {form.mode !== WorkoutMode._ && (
          <button type="button" onClick={handleAddEx}>
            +
          </button>
        )}
        <button type="submit" disabled={!isValid}>
          {submitButtonText}
        </button>
        {error && <div>{error.message}</div>}
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
