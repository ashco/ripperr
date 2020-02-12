import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

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

import { FirstFields, ButtonRow } from './index';
import { MovementFormWrapper } from './styles';

import {
  IHandleChange,
  IMovements,
  IArchetype,
  IExercise,
  IWorkout,
  IMovementFormValues,
  IArchetypeFormValues,
  IArchetypeFormErrors,
  IExerciseFormValues,
  IExerciseFormErrors,
  IWorkoutFormValues,
  IWorkoutFormErrors,
  IButtonRowBtn,
} from '../../common/types';
import { FormMode, MovementType, WorkoutMode } from '../../common/enums';

const INITIAL_FORM_VALUES_AR: IArchetypeFormValues = {
  name: '',
  description: '',
};

const INITIAL_ERROR_VALUES_AR: IArchetypeFormErrors = {
  name: '',
  description: '',
};

const INITIAL_FORM_VALUES_EX: IExerciseFormValues = {
  name: '',
  description: '',
  tags: [],
};

const INITIAL_ERROR_VALUES_EX: IExerciseFormErrors = {
  name: '',
  description: '',
  tags: '',
};

const INITIAL_FORM_VALUES_WO: IWorkoutFormValues = {
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

const INITIAL_ERROR_VALUES_WO: IWorkoutFormErrors = {
  name: '',
  description: '',
  tags: '',
  // mode: '',
  // movements: [''],
  // rest: '',
  // config: {
  //   rounds: '',
  // },
};

const MovementForm: React.FC<{
  movementType: MovementType;
  formMode: FormMode;
  movement?: IMovements;
  hide: () => void;
}> = ({ formMode, movementType, movement, hide }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const { archetypes, exercises, workouts } = useContext(MovementsContext);

  // ============ SET UP FORM STATE ============
  let initialFormState: IMovements | IMovementFormValues;
  if (
    (movement && formMode === FormMode.View) ||
    (movement && formMode === FormMode.Edit)
  ) {
    initialFormState = movement;
  } else if (movementType === MovementType.Archetype) {
    initialFormState = INITIAL_FORM_VALUES_AR;
  } else if (movementType === MovementType.Exercise) {
    initialFormState = INITIAL_FORM_VALUES_EX;
  } else if (movementType === MovementType.Workout) {
    initialFormState = INITIAL_FORM_VALUES_WO;
  } else {
    return <div>This will never show</div>;
  }

  let movementText = '';
  let initialErrorValues;
  if (movementType === MovementType.Archetype) {
    movementText = 'Archetype';
    initialErrorValues = INITIAL_ERROR_VALUES_AR;
  } else if (movementType === MovementType.Exercise) {
    movementText = 'Exercise';
    initialErrorValues = INITIAL_ERROR_VALUES_EX;
  } else if (movementType === MovementType.Workout) {
    movementText = 'Workout';
    initialErrorValues = INITIAL_ERROR_VALUES_WO;
  } else {
    return <div>Make this error handling cleaner</div>;
  }

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorValues);

  // ============ FORMMODE SPECIFIC VALUES ============

  const text = {
    title: '',
    submitButton: '',
  };
  const cancelBtn: IButtonRowBtn = {
    text: '',
  };
  const actionBtn: IButtonRowBtn = {
    text: '',
  };

  if (formMode === FormMode.Add) {
    text.title = `Create New ${movementText}`;
    text.submitButton = 'Submit';
    cancelBtn.text = 'Cancel';
    cancelBtn.onClick = hide;
    actionBtn.text = 'Create';
  } else if (formMode === FormMode.Edit) {
    text.title = `Edit ${movementText}`;
    text.submitButton = 'Update';
    cancelBtn.text = 'Cancel';
    cancelBtn.onClick = hide; // switch to view mode
    actionBtn.text = 'Update';
  } else if (formMode === FormMode.View) {
    text.title = `View ${movementText}`;
    text.submitButton = 'Update';
    cancelBtn.text = 'Close';
    cancelBtn.onClick = hide;
    actionBtn.text = 'Edit';
    // actionBtn.onClick = edit; // switch to edit mode
  }

  // ============ FIREBASE FUNCTIONS ============

  function handleCreateMovement(form: IMovementFormValues): void {
    let firebaseFnc;
    let movementList;
    if (movementType === MovementType.Archetype) {
      firebaseFnc = firebase.archetypes;
      movementList = archetypes;
    } else if (movementType === MovementType.Exercise) {
      firebaseFnc = firebase.exercises;
      movementList = exercises;
    } else if (movementType === MovementType.Workout) {
      firebaseFnc = firebase.workouts;
      movementList = workouts;
    } else {
      console.log('No MovementType specified!');
      return;
    }

    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();

      // Check that name is unique
      const moveNames = movementList.map((move) => move.name);
      if (moveNames.includes(form.name)) {
        toast.error(`${movementText} name is already in use.`);
        return;
      }

      const movementObj: IMovements = {
        id: docRef.id,
        lastModified: firebase.getTimestamp(),
        type: movementType,
        name: form.name,
        description: form.description,
        history: [],
      };

      if (movementType === MovementType.Archetype) {
        // Add nothing..
      } else if (movementType === MovementType.Exercise) {
        (movementObj as IExercise).tags = form.tags;
      } else if (movementType === MovementType.Workout) {
        (movementObj as IWorkout).tags = form.tags;
        (movementObj as IWorkout).mode = form.mode;
        (movementObj as IWorkout).movements = form.movements;
        (movementObj as IWorkout).rest = form.rest;
        (movementObj as IWorkout).config = {};
      }

      docRef
        .set(movementObj)
        .then(() => {
          console.log(`${movementText} Added: ${movementObj.name}`);
          hide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser!');
    }
  }

  function handleUpdateMovement(form: IMovementFormValues): void {
    let firebaseFnc;
    let movementList;
    if (movementType === MovementType.Archetype) {
      firebaseFnc = firebase.archetype;
      movementList = archetypes;
    } else if (movementType === MovementType.Exercise) {
      firebaseFnc = firebase.exercise;
      movementList = exercises;
    } else if (movementType === MovementType.Workout) {
      firebaseFnc = firebase.workout;
      movementList = workouts;
    } else {
      console.log('No MovementType specified!');
      return;
    }

    if (authUser && movement) {
      // Check that name is unique or matches with current id
      const moveNames = movementList.map((move) => move.name);
      if (moveNames.includes(form.name) && movement.name !== form.name) {
        toast.error(`${movementText} name is already in use.`);
        return;
      }

      const movementObj: IExerciseFormValues = {
        lastModified: firebase.getTimestamp(),
        name: form.name,
        description: form.description,
        tags: form.tags,
      };

      firebaseFnc(authUser.uid, movement.id)
        .update(movementObj)
        .then(() => {
          console.log(`${movementText} Updated: ${movementObj.name}`);
          hide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser || movement!');
    }
  }

  // ============ FORM FUNCTIONS ============

  function handleChangeForm(e: IHandleChange): void {
    handleChange(e, form, setForm);
    handleValidation(e, errors, setErrors);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (validateForm(errors)) {
      if (formMode === FormMode.Add) {
        handleCreateMovement(form);
      } else if (formMode === FormMode.Edit) {
        handleUpdateMovement(form);
      }
    } else {
      toast.error('There is a problem with your configuration..');
    }
  }

  return (
    <ExerciseFormWrapper>
      <h1>{text.title}</h1>
      <form
        onSubmit={handleSubmit}
        className={formMode === FormMode.View ? 'view-mode' : 'edit-mode'}
        noValidate
      >
        <FirstFields
          form={form}
          errors={errors}
          formMode={formMode}
          handleChange={handleChangeForm}
        />
        {/* <ButtonRow hide={hide} submitText={text.submitButton} /> */}
        <ButtonRow cancelBtn={cancelBtn} actionBtn={actionBtn} />
      </form>
    </ExerciseFormWrapper>
  );
};

const ExerciseFormWrapper = styled(MovementFormWrapper)`
  width: ${(p) => p.theme.space[13]};
`;

export default MovementForm;
