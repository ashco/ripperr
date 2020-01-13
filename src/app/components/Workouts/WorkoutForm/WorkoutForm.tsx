import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../../Firebase';
import { AuthUserContext } from '../../Session';
import { Formik, Form } from 'formik';

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
      exerciseId: '12345',
      reps: 5,
      sets: 4,
    },
    {
      exerciseId: '1222345',
      reps: 52,
      sets: 42,
    },
  ],
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

  const [form, setForm] = useState(initialFormState);

  // Only update if a value is different and none are blank.
  let isValid = true;
  let isValidName = true;

  if (workout) {
    isValidName = name !== '' || name !== workout.name;
  }

  isValid = isValidName;

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

  function handleCreate(values: IWorkoutFormValues): void {
    if (authUser) {
      const docRef = firebase.workouts(authUser.uid).doc();
      const { id } = docRef;

      // TODO - Check that workout name is unique

      docRef
        .set({
          workoutId: id,
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
        .workout(authUser.uid, workout.workoutId)
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
    // const newForm = { ...form, [name]: value };

    // Sets exercise object
    if (exIndex !== undefined) {
      newForm.exercises[exIndex][name] = value;
    } else {
      newForm[name] = value;
    }
    console.log(newForm);
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
      exerciseId: '',
      sets: 0,
      reps: 0,
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
            <option label="Reps + Sets" value="reps-sets" />
            <option label="Tabata" value="tabata" />
          </select>
        </div>
        {form.exercises &&
          form.exercises.map((ex, i) => (
            <div key={i}>
              <div>
                <label htmlFor={`exercise-${i}`}>
                  Exercise {i + 1}
                  <select
                    name="exerciseId"
                    onChange={handleChange.bind(null, i)}
                    value={form.exercises[i].exerciseId}
                  >
                    <option label="Burpees" value="123" />
                    <option label="Mountain Climbers" value="456" />
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
              <button type="button" onClick={() => handleExDelete(i)}>
                -
              </button>
            </div>
          ))}
        <button type="button" onClick={handleExAdd}>
          +
        </button>
        <button type="submit">Submit</button>
      </form>
    </WorkoutFormWrapper>
    // <Formik
    //   initialValues={initialFormState}
    //   validationSchema={workoutFormVal}
    //   onSubmit={(values): void => {
    //     if (formMode === 'Add') {
    //       handleCreate(values);
    //     } else if (formMode === 'Edit') {
    //       handleUpdate(values);
    //     }
    //   }}
    // >
    //   <WorkoutFormWrapper>
    //     <button onClick={hide}>Close</button>
    //     <h1>{titleText}</h1>
    //     <Form>
    //       <InputField
    //         label="Name"
    //         name="name"
    //         type="text"
    //         placeholder="Push + Pull"
    //       />
    //       <SelectField
    //         label="Workout Mode"
    //         name="workoutMode"
    //         options={[
    //           { label: 'Reps + Sets', value: 'reps-sets' },
    //           { label: 'Tabata', value: 'tabata' },
    //         ]}
    //       />
    //       {/* <WorkoutModeFormFields num={exFieldCount} /> */}
    //       {/* {[...Array(exFieldCount)].map((e, i) => (
    //         <RepsSetsFormRow num={i} key={i} />
    //       ))} */}

    //       <RepsSetsFormRow num="1" />

    //       <button type="button" onClick={handleAddField}>
    //         Add Exercise +
    //       </button>

    //       <button disabled={!isValid}>{submitButtonText}</button>
    //     </Form>
    //   </WorkoutFormWrapper>
    // </Formik>
  );
};

const WorkoutFormWrapper = styled.div`
  background: white;
  height: 500px;
  width: 500px;
`;

export default WorkoutForm;
