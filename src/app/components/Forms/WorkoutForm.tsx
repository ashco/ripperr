import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import {
  FirstFields,
  RepsField,
  TimedField,
  RestField,
  ModeField,
  ButtonRow,
} from './index';
import { MovementFormWrapper, Row } from './styles';
import { Button } from '../Buttons';
import {
  AuthUserContext,
  FirebaseContext,
  MovementsContext,
} from '../../context';
import {
  handleChange,
  handleValidation,
  validateForm,
} from '../../common/formHelpers';

import {
  IHandleChange,
  IWorkout,
  IWorkoutFormValues,
  IWorkoutFormErrors,
  IMovementRefs,
  // IMovementRefReps,
  // IMovementRefTimed,
} from '../../common/types';
import {
  FormFieldProp,
  FormMode,
  WorkoutMode,
  MovementType,
} from '../../common/enums';

const INITIAL_FORM_VALUES: IWorkoutFormValues = {
  name: '',
  description: '',
  tags: [],
  mode: WorkoutMode.Reps,
  movements: [
    {
      id: '',
      name: '',
      reps: 0,
      sets: 0,
      duration: 0,
    },
  ],
  rest: {
    auto: true,
    inner: 45,
    outer: 60,
  },
  config: {
    // TIMED
    rounds: 1,
  },
};

const INITIAL_ERROR_VALUES = {
  name: '',
  description: '',
  tags: '',
  mode: '',
  // movements: [''],
  // rest: '',
  // config: {
  //   rounds: '',
  // },
};

const WorkoutForm: React.FC<{
  formMode: FormMode;
  hide: () => void;
  workout?: IWorkout;
}> = ({ formMode, hide, workout }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const { workouts } = useContext(MovementsContext);

  // console.log(workouts);

  // ============ SET UP FORM STATE ============
  let initialFormState = {
    ...INITIAL_FORM_VALUES,
    movements: INITIAL_FORM_VALUES.movements.map((move) => ({
      ...move,
    })),
    rest: { ...INITIAL_FORM_VALUES.rest },
    config: { ...INITIAL_FORM_VALUES.config },
  };
  if (formMode === FormMode.Edit && workout) {
    initialFormState = workout;
  }

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(INITIAL_ERROR_VALUES);

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

      // Check that name is unique
      const woNames = workouts.map((wo) => wo.name);
      if (woNames.includes(form.name)) {
        toast.error('Workout name is already in use.');
        return;
      }

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
    handleValidation(e, errors, setErrors);
  }

  const handleChangeFormMovement = (e: IHandleChange, i: number): void => {
    handleChange(e, form, setForm, {
      type: FormFieldProp.Movements,
      index: i,
    });
  };

  function handleChangeFormRest(e: IHandleChange): void {
    handleChange(e, form, setForm, { type: FormFieldProp.Rest });
  }

  function handleChangeFormConfig(e: IHandleChange): void {
    handleChange(e, form, setForm, { type: FormFieldProp.Config });
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
      name: '',
      reps: 0,
      sets: 0,
      duration: 0,
    };

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
            move={move}
            i={i}
            handleChange={handleChangeFormMovement}
            handleDeleteMovementRef={handleDeleteMovementRef}
          />
        ));
      } else if (form.mode === WorkoutMode.Timed) {
        return form.movements.map((move, i) => (
          <TimedField
            key={i}
            move={move}
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
          <FirstFields
            form={form}
            errors={errors}
            handleChange={handleChangeForm}
          />
          <ModeField
            form={form}
            errors={errors}
            handleChange={handleChangeForm}
            handleChangeConfig={handleChangeFormConfig}
          />
          {renderMovementFields()}
          <button
            type="button"
            className="add-btn"
            onClick={() => handleAddMovementRef(form.mode)}
          >
            +
          </button>
          <RestField form={form} handleChange={handleChangeFormRest} />
        </div>
        <ButtonRow hide={hide} submitText={text.submitButton} />
      </form>
    </WorkoutFormWrapper>
  );
};

const WorkoutFormWrapper = styled(MovementFormWrapper)`
  width: ${(p) => p.theme.space[14]};
  /* button {
    font-size: 1.8rem;
    margin: 0.25rem;
    padding: 0.6rem;
  } */
`;

export default WorkoutForm;
