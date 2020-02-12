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
  IExercise,
  IExerciseFormValues,
  IExerciseFormErrors,
  IButtonRowBtn,
} from '../../common/types';
import { FormMode, MovementType } from '../../common/enums';

const INITIAL_FORM_VALUES: IExerciseFormValues = {
  name: '',
  description: '',
  tags: [],
};

const INITIAL_ERROR_VALUES: IExerciseFormErrors = {
  name: '',
  description: '',
  tags: '',
};

const ExerciseForm: React.FC<{
  formMode: FormMode;
  hide: () => void;
  exercise?: IExercise;
}> = ({ formMode, hide, exercise }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const { exercises } = useContext(MovementsContext);

  // ============ SET UP FORM STATE ============
  let initialFormState = INITIAL_FORM_VALUES;
  if (
    (exercise && formMode === FormMode.View) ||
    (exercise && formMode === FormMode.Edit)
  ) {
    initialFormState = exercise;
  }

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(INITIAL_ERROR_VALUES);

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
    text.title = 'Create New Exercise';
    text.submitButton = 'Submit';
    cancelBtn.text = 'Cancel';
    cancelBtn.onClick = hide;
    actionBtn.text = 'Create';
  } else if (formMode === FormMode.Edit) {
    text.title = 'Edit Exercise';
    text.submitButton = 'Update';
    cancelBtn.text = 'Cancel';
    cancelBtn.onClick = hide; // switch to view mode
    actionBtn.text = 'Update';
  } else if (formMode === FormMode.View) {
    text.title = 'View Exercise';
    text.submitButton = 'Update';
    cancelBtn.text = 'Close';
    cancelBtn.onClick = hide;
    actionBtn.text = 'Edit';
    // actionBtn.onClick = edit; // switch to edit mode
  }

  // ============ FIREBASE FUNCTIONS ============

  function handleCreateExercise(form: IExerciseFormValues): void {
    if (authUser) {
      const docRef = firebase.exercises(authUser.uid).doc();

      // Check that name is unique
      const exNames = exercises.map((ex) => ex.name);
      if (exNames.includes(form.name)) {
        toast.error('Exercise name is already in use.');
        return;
      }

      const exerciseObj: IExercise = {
        id: docRef.id,
        lastModified: firebase.getTimestamp(),
        type: MovementType.Exercise,
        name: form.name,
        description: form.description,
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
      // Check that name is unique or matches with current id
      const exNames = exercises.map((ex) => ex.name);
      if (exNames.includes(form.name) && exercise.name !== form.name) {
        toast.error('Exercise name is already in use.');
        return;
      }

      const exerciseObj: IExerciseFormValues = {
        lastModified: firebase.getTimestamp(),
        name: form.name,
        description: form.description,
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

  function handleChangeForm(e: IHandleChange): void {
    handleChange(e, form, setForm);
    handleValidation(e, errors, setErrors);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (validateForm(errors)) {
      if (formMode === FormMode.Add) {
        handleCreateExercise(form);
      } else if (formMode === FormMode.Edit) {
        handleUpdateExercise(form);
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

export default ExerciseForm;
