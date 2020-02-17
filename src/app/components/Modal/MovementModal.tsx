﻿import React, { useState, useContext, useReducer } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import {
  AuthUserContext,
  FirebaseContext,
  MovementsContext,
} from '../../context';
import { useFormState, useFormDispatch } from '../../context/FormContext';
import { useModalDispatch } from '../../context/ModalContext';

// import { MovementFormWrapper } from '../Forms/styles';
import { ModalWrapper } from './styles';
import { ButtonRow } from '../Forms';

import {
  ArchetypeFormState,
  ExerciseFormState,
  WorkoutFormState,
  Archetype,
  Exercise,
  Workout,
  ButtonRowProps,
} from '../../common/types';
import { ModalMode, MovementType } from '../../common/enums';

const MovementModal: React.FC<{
  mode: ModalMode.Add | ModalMode.Edit | ModalMode.View;
}> = ({ mode }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const { archetypes, exercises, workouts } = useContext(MovementsContext);

  const formState = useFormState();
  const formDispatch = useFormDispatch();
  const modalDispatch = useModalDispatch();

  // ============ MODE SPECIFIC VALUES ============

  let movementText = 'Archetype';
  if (formState?.type === MovementType.Exercise) {
    movementText = 'Exercise';
  } else if (formState?.type === MovementType.Workout) {
    movementText = 'Workout';
  }

  let actionText = 'Add';
  let submitButton = 'Submit';

  const btnConfig: ButtonRowProps = {
    cancelBtn: {
      text: 'Cancel',
      onClick: () => modalDispatch({ type: 'MODAL_CLOSE' }),
    },
    actionBtn: {
      text: 'Create',
    },
  };

  if (mode === ModalMode.Edit) {
    actionText = 'Edit';
    submitButton = 'Update';
    btnConfig.cancelBtn.text = 'Cancel';
    btnConfig.actionBtn.text = 'Update';
  } else if (mode === ModalMode.View) {
    actionText = 'View';
    submitButton = 'Edit';
    btnConfig.cancelBtn.text = 'Close';
    btnConfig.actionBtn.text = 'Edit';
  }

  const text = {
    title: `${actionText} ${movementText}`,
    submitButton,
  };

  // const cancelBtn: IButtonRowBtn = {
  //   text: '',
  // };

  // const actionBtn: IButtonRowBtn = {
  //   text: '',
  // };

  function handleCreateMovement(
    formState: ArchetypeFormState | ExerciseFormState | WorkoutFormState,
  ): void {
    let firebaseFnc;
    let movementList;
    if (formState.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetypes;
      movementList = archetypes;
    } else if (formState.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercises;
      movementList = exercises;
    } else if (formState.type === MovementType.Workout) {
      firebaseFnc = firebase.workouts;
      movementList = workouts;
    } else {
      throw Error('No MovementType specified!');
      return;
    }
    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();
      // Check that name is unique
      const moveNames = movementList.map((move) => move.name);
      if (moveNames.includes(formState.name)) {
        toast.error(`${movementText} name is already in use.`);
        return;
      }

      const movementObj: Archetype | Exercise | Workout = {
        id: docRef.id,
        lastModified: firebase.getTimestamp(),
        type: formState.type,
        name: formState.name,
        description: formState.description,
        history: [],
      };
      if (formState.type === MovementType.Exercise) {
        (movementObj as Exercise).tags = formState.tags;
      } else if (formState.type === MovementType.Workout) {
        (movementObj as Workout).tags = formState.tags;
        (movementObj as Workout).mode = formState.mode;
        (movementObj as Workout).movements = formState.movements;
        (movementObj as Workout).rest = formState.rest;
        (movementObj as Workout).config = {};
      }
      docRef
        .set(movementObj)
        .then(() => {
          console.log(`${movementText} Added: ${movementObj.name}`);
          modalDispatch({ type: 'MODAL_CLOSE' });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('There is no authUser!');
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (mode === ModalMode.Add && formState) {
      handleCreateMovement(formState);
    }

    // if (validateForm(errors)) {
    //   if (formMode === FormMode.Add) {
    //     handleCreateMovement(form);
    //   } else if (formMode === FormMode.Edit) {
    //     handleUpdateMovement(form);
    //   }
    // } else {
    //   toast.error('There is a problem with your configuration..');
    // }
  }

  return (
    <MovementModalWrapper>
      <h1 className="title">{text.title}</h1>
      <form
        onSubmit={handleSubmit}
        className={mode === ModalMode.View ? 'view-mode' : 'edit-mode'}
        noValidate
      >
        <div className="first-fields">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={
              (formState as
                | ArchetypeFormState
                | ExerciseFormState
                | WorkoutFormState).name
            }
            onChange={(e) =>
              formDispatch({ type: 'FORM_NAME', value: e.target.value })
            }
            disabled={mode === ModalMode.View}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description..."
            value={
              (formState as
                | ArchetypeFormState
                | ExerciseFormState
                | WorkoutFormState).description
            }
            onChange={(e) =>
              formDispatch({
                type: 'FORM_DESCRIPTION',
                value: e.target.value,
              })
            }
            disabled={mode === ModalMode.View}
          />
        </div>
        <ButtonRow config={btnConfig} />
      </form>
    </MovementModalWrapper>
  );
};

const MovementModalWrapper = styled(ModalWrapper)`
  display: grid;
  /* width: ${(p) => p.theme.space[12]}; */
  max-width: 100%;
  /* max-width: 70%; */
  h1.title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  input {
    font-size: 20px;
  }
  input[type='number'] {
    width: 4.5rem;
    text-align: center;
  }
  input,
  textarea {
    border: 2px solid black;
  }
  textarea {
    font-size: 1rem;
  }
  input,
  textarea,
  select {
    padding: 0.5rem;
  }
  select {
    border: none;
  }
  .view-mode {
    input,
    textarea {
      /* border: none;
      padding-left: 0; */
      background: none;
      color: ${(props) => props.theme.color.neutral[900]};
    }
  }
  .edit-mode {
  }
  /* .error {
    margin: auto 0.25rem;
    font-size: 0.75rem;
  } */
  .add-btn {
    width: 100%;
  }
  .add-btn,
  .rem-btn {
    font-size: 1.5rem;
    border: 1px solid black;
  }
  .missing-option {
    background: yellow;
  }
  width: ${(p) => p.theme.space[13]};

  /* ------ Section specific styling ------ */
  .first-fields {
    display: grid;
    /* grid-template-rows: auto 1rem auto 1rem auto 1rem; */
    grid-template-rows: auto auto;
    #description {
      height: 4rem;
      resize: none;
    }
  }
`;

export default MovementModal;
