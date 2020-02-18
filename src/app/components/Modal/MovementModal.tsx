import React, { useState, useContext, useReducer } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import {
  AuthUserContext,
  FirebaseContext,
  MovementListContext,
} from '../../context';
import {
  useMovementState,
  useMovementDispatch,
} from '../../context/MovementContext';
import { useModalDispatch } from '../../context/ModalContext';

// import { MovementFormWrapper } from '../Forms/styles';
import { ModalWrapper } from './styles';
import { ButtonRow } from '../Forms';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  ButtonRowProps,
} from '../../common/types';
import { ModalMode, MovementType } from '../../common/enums';

const MovementModal: React.FC<{
  mode: ModalMode.Add | ModalMode.Edit | ModalMode.View;
  movement?: Movement;
}> = ({ mode, movement }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const { archetypes, exercises, workouts } = useContext(MovementListContext);

  const movementState = useMovementState();
  const movementDispatch = useMovementDispatch();
  const modalDispatch = useModalDispatch();

  // ============ MODE SPECIFIC VALUES ============

  let movementText = 'Archetype';
  if (movementState?.type === MovementType.Exercise) {
    movementText = 'Exercise';
  } else if (movementState?.type === MovementType.Workout) {
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

  // ========= MOVEMENT FUNCTIONS =========

  function handleUpdateMovement(movementState: Movement): void {
    let firebaseFnc;
    let movementList;

    if (movementState.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetype;
      movementList = archetypes;
    } else if (movementState.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercise;
      movementList = exercises;
    } else if (movementState.type === MovementType.Workout) {
      firebaseFnc = firebase.workout;
      movementList = workouts;
    } else {
      throw Error('No MovementType specified!');
    }

    if (authUser && movement && movement.id) {
      // Check that name is unique or matches with current id
      const moveNames = movementList.map((move) => move.name);
      if (
        moveNames.includes(movementState.name) &&
        movement.name !== movementState.name
      ) {
        toast.error(`${movementText} name is already in use.`);
        return;
      }

      const movementObj: Movement = movementState;
      movementObj.lastModified = firebase.getTimestamp();

      // const movementObj: any = {
      //   lastModified: firebase.getTimestamp(),
      //   name: movementState.name,
      //   description: movementState.description,
      // };
      // if (
      //   movementState.type === MovementType.Exercise ||
      //   movementState.type === MovementType.Workout
      // ) {
      //   movementObj.tags = movementState.tags;
      // }
      // if (movementState.type === MovementType.Workout) {
      //   movementObj.mode = movementState.mode;
      //   movementObj.movements = movementState.movements;
      //   movementObj.rest = movementState.rest;
      //   movementObj.config = movementState.config;
      // }

      firebaseFnc(authUser.uid, movement.id)
        .update(movementObj)
        .then(() => {
          console.log(`${movementText} Updated: ${movementObj.name}`);
          modalDispatch({ type: 'MODAL_CLOSE' });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw Error('There is no authUser && movement && movement.id!');
    }
  }

  function handleCreateMovement(movementState: Movement): void {
    let firebaseFnc;
    let movementList;
    if (movementState.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetypes;
      movementList = archetypes;
    } else if (movementState.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercises;
      movementList = exercises;
    } else if (movementState.type === MovementType.Workout) {
      firebaseFnc = firebase.workouts;
      movementList = workouts;
    } else {
      throw Error('No MovementType specified!');
    }
    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();
      // Check that name is unique
      const moveNames = movementList.map((move) => move.name);
      if (moveNames.includes(movementState.name)) {
        toast.error(`${movementText} name is already in use.`);
        return;
      }

      const movementObj: Movement = { ...movementState };
      movementObj.lastModified = firebase.getTimestamp();
      // const movementObj: Archetype = {
      //   id: docRef.id,
      //   lastModified: firebase.getTimestamp(),
      //   type: movementState.type,
      //   name: movementState.name,
      //   description: movementState.description,
      //   history: [],
      // };
      // if (
      //   movementState.type === MovementType.Exercise ||
      //   movementState.type === MovementType.Workout
      // ) {
      //   (movementObj as Exercise | Workout).tags = (movementState as
      //     | Exercise
      //     | Workout).tags;
      // }
      // if (movementState.type === MovementType.Workout) {
      //   (movementObj as Workout).tags = (movementState as Workout).tags;
      //   (movementObj as Workout).mode = (movementState as Workout).mode;
      //   (movementObj as Workout).movements = (movementState as Workout).movements;
      //   (movementObj as Workout).rest = (movementState as Workout).rest;
      //   (movementObj as Workout).config = {};
      // }
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
      throw Error('There is no authUser!');
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (movementState) {
      if (mode === ModalMode.Add) {
        handleCreateMovement(movementState);
      } else if (mode === ModalMode.Edit) {
        handleUpdateMovement(movementState);
      }
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
            value={(movementState as Movement).name}
            onChange={(e) =>
              movementDispatch({
                type: 'MOVE_CHANGE_NAME',
                value: e.target.value,
              })
            }
            disabled={mode === ModalMode.View}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description..."
            value={(movementState as Movement).description}
            onChange={(e) =>
              movementDispatch({
                type: 'MOVE_CHANGE_DESCRIPTION',
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
