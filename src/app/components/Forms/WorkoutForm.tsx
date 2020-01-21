import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import {
  FirstFields,
  RepsField,
  TimedField,
  RestField,
  ModeField,
} from './index';
import { AuthUserContext, FirebaseContext } from '../../context';
import { handleChange } from '../../common/formHelpers';

import {
  IHandleChange,
  IWorkout,
  IWorkoutFormValues,
  IMovementRefs,
  IMovementRefReps,
  IMovementRefTimed,
} from '../../common/types';
import {
  FormFieldProp,
  FormMode,
  WorkoutMode,
  MovementType,
} from '../../common/enums';

const INITIAL_VALUES: IWorkoutFormValues = {
  name: '',
  description: '',
  tags: [],
  mode: WorkoutMode.Reps,
  movements: [
    {
      id: '',
      reps: 0,
      sets: 0,
    },
  ],
  rest: {
    auto: true,
    inner: 45,
    outer: 60,
  },
  config: {
    // TIMED
    rounds: 0,
  },
};

const WorkoutForm: React.FC<{
  formMode: FormMode;
  hide: () => void;
  workout?: IWorkout;
}> = ({ formMode, hide, workout }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  // ============ SET UP FORM STATE ============

  let initialFormState = {
    ...INITIAL_VALUES,
    movements: INITIAL_VALUES.movements.map((move) => ({ ...move })),
    rest: { ...INITIAL_VALUES.rest },
    config: { ...INITIAL_VALUES.config },
  };
  if (formMode === FormMode.Edit && workout) {
    initialFormState = workout;
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
    text.title = 'Create New Workout';
    text.submitButton = 'Submit';
  } else if (formMode === FormMode.Edit) {
    text.title = 'Edit Workout';
    text.submitButton = 'Update';
  }

  // ============ FIREBASE FUNCTIONS ============

  function handleCreateWorkout(form: IWorkoutFormValues): void {
    if (authUser) {
      const docRef = firebase.workouts(authUser.uid).doc();

      // TODO - Check that workout name is unique

      const workoutObj: IWorkout = {
        id: docRef.id,
        lastModified: firebase.getTimestamp(),
        type: MovementType.Workout,
        name: form.name,
        description: form.description,
        tags: form.tags,
        history: [],
        mode: form.mode,
        movements: form.movements,
        rest: form.rest,
        config: {},
      };

      docRef
        .set(workoutObj)
        .then(() => {
          console.log(`Workout Added: ${workoutObj.name}`);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser!');
    }
  }

  function handleUpdateWorkout(form: IWorkoutFormValues): void {
    if (authUser && workout) {
      const workoutObj: IWorkoutFormValues = {
        lastModified: firebase.getTimestamp(),
        name: form.name,
        description: form.description,
        tags: form.tags,
        mode: form.mode,
        movements: form.movements,
        rest: form.rest,
        config: {},
      };

      firebase
        .workout(authUser.uid, workout.id)
        .update(workoutObj)
        .then(() => {
          console.log(`Workout Updated: ${workoutObj.name}`);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser || workout!');
    }
  }

  // ============ FORM FUNCTIONS ============
  function handleChangeForm(e: IHandleChange): void {
    handleChange(e, form, setForm);
  }

  const handleChangeFormMovement = (e: IHandleChange, i: number): void => {
    handleChange(e, form, setForm, {
      type: FormFieldProp.Movements,
      index: i,
    });
  };
  // function handleChangeFormMovement(e: IHandleChange, i: number): void {
  //   handleChange(e, form, setForm, {
  //     type: FormFieldProp.Movements,
  //     index: i,
  //   });
  // }

  function handleChangeFormRest(e: IHandleChange): void {
    handleChange(e, form, setForm, { type: FormFieldProp.Rest });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (formMode === FormMode.Add) {
      handleCreateWorkout(form);
    } else if (formMode === FormMode.Edit) {
      handleUpdateWorkout(form);
    }

    hide();
  }

  // ============ MOVEMENT FIELD HANDLERS ============

  function handleAddMovementRef(mode: WorkoutMode): void {
    const newForm = { ...form };

    const newMovement: IMovementRefs = {
      id: '',
    };

    if (mode === WorkoutMode.Reps) {
      newMovement.reps = 0;
      newMovement.sets = 0;
    } else if (mode === WorkoutMode.Timed) {
      newMovement.duration = 0;
    }

    newForm.movements.push(newMovement);
    setForm(newForm);
  }

  function handleDeleteMovementRef(i: number): void {
    const newForm = { ...form };

    newForm.movements.splice(i, 1);
    setForm(newForm);
  }

  // ============ RENDER FUNCTION ============
  function renderMovementFields() {
    if (form.movements) {
      if (form.mode === WorkoutMode.Reps) {
        return form.movements.map((move, i) => (
          <RepsField
            key={i}
            move={move as IMovementRefReps}
            i={i}
            handleChange={handleChangeFormMovement}
            handleDeleteMovementRef={handleDeleteMovementRef}
          />
        ));
      } else if (form.mode === WorkoutMode.Timed) {
        return form.movements.map((move, i) => (
          <TimedField
            key={i}
            move={move as IMovementRefTimed}
            i={i}
            handleChange={handleChangeFormMovement}
            handleDeleteMovementRef={handleDeleteMovementRef}
          />
        ));
      }
    }
  }

  return (
    <WorkoutFormWrapper>
      <h1>{text.title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <FirstFields form={form} handleChange={handleChangeForm} />
          <ModeField form={form} handleChange={handleChangeForm} />
          {renderMovementFields()}
          <button
            type="button"
            onClick={(): void => handleAddMovementRef(form.mode)}
          >
            +
          </button>
          <RestField form={form} handleChange={handleChangeFormRest} />
        </div>
        <button type="submit" disabled={!isValid}>
          {text.submitButton}
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
