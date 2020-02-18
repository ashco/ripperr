import React, { useState, useContext, useReducer } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import {
  AuthUserContext,
  FirebaseContext,
  MovementListContext,
} from '../../context';
import {
  useMoveState,
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
}> = ({ mode }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const { archetypes, exercises, workouts } = useContext(MovementListContext);

  const moveState = useMoveState();
  const movementDispatch = useMovementDispatch();
  const modalDispatch = useModalDispatch();

  // ============ MODE SPECIFIC VALUES ============

  let movementText = 'Archetype';
  if (moveState?.type === MovementType.Exercise) {
    movementText = 'Exercise';
  } else if (moveState?.type === MovementType.Workout) {
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

  function handleUpdateMovement(moveState: Movement): void {
    let firebaseFnc;
    let movementList;

    if (moveState.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetype;
      movementList = archetypes;
    } else if (moveState.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercise;
      movementList = exercises;
    } else if (moveState.type === MovementType.Workout) {
      firebaseFnc = firebase.workout;
      movementList = workouts;
    } else {
      throw Error('moveState type is not recognized!');
    }

    if (authUser && moveState.id) {
      // Check that name is unique or matches with current id
      const moveNames = movementList.map((move) => move.name);
      // if (
      //   moveNames.includes(moveState.name) &&
      //   movement.name !== moveState.name
      // ) {
      //   toast.error(`${movementText} name is already in use.`);
      //   return;
      // }

      const moveObj: Movement = { ...moveState };
      moveObj.lastModified = firebase.getTimestamp();

      // const moveObj: any = {
      //   lastModified: firebase.getTimestamp(),
      //   name: moveState.name,
      //   description: moveState.description,
      // };
      // if (
      //   moveState.type === MovementType.Exercise ||
      //   moveState.type === MovementType.Workout
      // ) {
      //   moveObj.tags = moveState.tags;
      // }
      // if (moveState.type === MovementType.Workout) {
      //   moveObj.mode = moveState.mode;
      //   moveObj.movements = moveState.movements;
      //   moveObj.rest = moveState.rest;
      //   moveObj.config = moveState.config;
      // }

      firebaseFnc(authUser.uid, moveState.id)
        .update(moveObj)
        .then(() => {
          console.log(`${movementText} Updated: ${moveObj.name}`);
          modalDispatch({ type: 'MODAL_CLOSE' });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw Error('There is no authUser && movement && movement.id!');
    }
  }

  function handleCreateMovement(moveState: Movement): void {
    let firebaseFnc;
    let movementList;
    if (moveState.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetypes;
      movementList = archetypes;
    } else if (moveState.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercises;
      movementList = exercises;
    } else if (moveState.type === MovementType.Workout) {
      firebaseFnc = firebase.workouts;
      movementList = workouts;
    } else {
      throw Error('No MovementType specified!');
    }

    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();
      // Check that name is unique
      const moveNames = movementList.map((move) => move.name);
      // if (moveNames.includes(moveState.name)) {
      //   toast.error(`${movementText} name is already in use.`);
      //   return;
      // }

      const moveObj: Movement = { ...moveState };
      moveObj.lastModified = firebase.getTimestamp();
      // const moveObj: Archetype = {
      //   id: docRef.id,
      //   lastModified: firebase.getTimestamp(),
      //   type: moveState.type,
      //   name: moveState.name,
      //   description: moveState.description,
      //   history: [],
      // };
      // if (
      //   moveState.type === MovementType.Exercise ||
      //   moveState.type === MovementType.Workout
      // ) {
      //   (moveObj as Exercise | Workout).tags = (moveState as
      //     | Exercise
      //     | Workout).tags;
      // }
      // if (moveState.type === MovementType.Workout) {
      //   (moveObj as Workout).tags = (moveState as Workout).tags;
      //   (moveObj as Workout).mode = (moveState as Workout).mode;
      //   (moveObj as Workout).movements = (moveState as Workout).movements;
      //   (moveObj as Workout).rest = (moveState as Workout).rest;
      //   (moveObj as Workout).config = {};
      // }
      docRef
        .set(moveObj)
        .then(() => {
          console.log(`${movementText} Added: ${moveObj.name}`);
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

    if (moveState) {
      // if (mode === ModalMode.Add) {
      //   handleCreateMovement(moveState);
      // } else if (mode === ModalMode.Edit) {
      //   handleUpdateMovement(moveState);
      // }
      if (moveState.id) {
        handleUpdateMovement(moveState);
      } else {
        handleCreateMovement(moveState);
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
            value={(moveState as Movement).name}
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
            value={(moveState as Movement).description}
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
