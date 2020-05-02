import React from 'react';
import { ThemeContext } from 'styled-components';

import {
  AuthUserContext,
  FirebaseContext,
  MovementListContext,
} from '@/context';
import { useMoveState, useMoveDispatch } from '@/context/MoveContext';
import { useModalDispatch } from '@/context/ModalContext';

import ArchetypesField from './ArchetypesField';
import AddMovementButton from './AddMovementButton';
import BlockLabel from './BlockLabel';
import InlineLabel from './InlineLabel';
import ModeField from './ModeField';
import MovementsField from './MovementsField';
import RestField from './RestField';
import ButtonRow from '@/components/ButtonRow';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  ButtonRowProps,
} from '@/types/types';
import { ModalMode, MovementType } from '@/types/enums';

const MovementForm: React.FC<{
  mode: ModalMode.Add | ModalMode.Edit | ModalMode.View;
}> = ({ mode }) => {
  const firebase = React.useContext(FirebaseContext);
  const authUser = React.useContext(AuthUserContext);
  const movementList = React.useContext(MovementListContext);
  const themeContext = React.useContext(ThemeContext);

  const moveDispatch = useMoveDispatch();
  const modalDispatch = useModalDispatch();
  const moveState = useMoveState();

  let moveList: Archetype[] | Exercise[] | Workout[];
  if (moveState?.type === MovementType.Archetype) {
    moveList = movementList.archetypes;
  } else if (moveState?.type === MovementType.Exercise) {
    moveList = movementList.exercises;
  } else if (moveState?.type === MovementType.Workout) {
    moveList = movementList.workouts;
  } else {
    throw Error('No MovementType specified!');
  }

  let movementText = 'Archetype';
  if (moveState?.type === MovementType.Exercise) {
    movementText = 'Exercise';
  } else if (moveState?.type === MovementType.Workout) {
    movementText = 'Workout';
  }

  // ========= MOVEMENT FUNCTIONS =========

  function handleUpdateMovement(moveState: Movement): void {
    let firebaseFnc;

    if (moveState.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetype;
    } else if (moveState.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercise;
    } else if (moveState.type === MovementType.Workout) {
      firebaseFnc = firebase.workout;
    } else {
      throw Error('moveState type is not recognized!');
    }

    if (authUser && moveState.id) {
      // Check that name is unique or matches with current id

      const moveObj: Movement = { ...moveState };
      moveObj.lastModified = firebase.getTimestamp();

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
    // let moveList;
    if (moveState.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetypes;
      // moveList = movementList.archetypes;
    } else if (moveState.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercises;
      // moveList = movementList.exercises;
    } else if (moveState.type === MovementType.Workout) {
      firebaseFnc = firebase.workouts;
      // moveList = movementList.workouts;
    } else {
      throw Error('No MovementType specified!');
    }

    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();
      // Check that name is unique
      // const moveNames = moveList.map((move) => move.name);

      const moveObj: Movement = { ...moveState };
      moveObj.lastModified = firebase.getTimestamp();
      // const move
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

    if (!moveState) {
      throw Error('No moveState detected!');
    }

    if (mode === ModalMode.Add) {
      handleCreateMovement(moveState);
    } else if (mode === ModalMode.Edit) {
      if (moveState.id) {
        handleUpdateMovement(moveState);
      } else {
        throw Error('No moveState.id detected!');
      }
    } else if (mode === ModalMode.View) {
      modalDispatch({ type: 'MODAL_EDIT' });
    } else {
      throw Error('Unsupported ModalMode provided.');
    }
  }

  function handleClose() {
    modalDispatch({ type: 'MODAL_CLOSE' });
    moveDispatch({ type: 'MOVE_CLEAR' });
  }

  // BUTTON ROW CONFIG
  const btnConfig: ButtonRowProps = {
    cancelBtn: {
      text: 'Cancel',
      onClick: handleClose,
    },
    actionBtn: {
      text: 'Create',
    },
  };

  if (mode === ModalMode.Edit) {
    btnConfig.cancelBtn.onClick = (): void => {
      modalDispatch({ type: 'MODAL_VIEW' });

      // Have moveState reset back to original non-edited state
      const initMoveState = moveList.find((move) => move.id === moveState?.id);
      console.log(initMoveState);

      moveDispatch({ type: 'MOVE_SET', value: initMoveState });
    };
    btnConfig.cancelBtn.text = 'Cancel';
    btnConfig.actionBtn.text = 'Update';
  } else if (mode === ModalMode.View) {
    btnConfig.cancelBtn.text = 'Close';
    btnConfig.actionBtn.text = 'Edit';
  }

  const disabled = mode === ModalMode.View;

  return (
    <form
      onSubmit={handleSubmit}
      className={mode === ModalMode.View ? 'view-mode' : 'edit-mode'}
      noValidate
    >
      <InlineLabel name="Name">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={(moveState as Movement).name}
          onChange={(e) =>
            moveDispatch({
              type: 'MOVE_CHANGE_NAME',
              value: e.target.value,
            })
          }
          disabled={disabled}
        />
      </InlineLabel>
      <InlineLabel name="Description">
        <input
          id="description"
          name="description"
          placeholder="Enter a description..."
          value={(moveState as Movement).description}
          onChange={(e) =>
            moveDispatch({
              type: 'MOVE_CHANGE_DESCRIPTION',
              value: e.target.value,
            })
          }
          disabled={disabled}
        />
      </InlineLabel>
      {moveState?.type === MovementType.Workout && (
        <>
          <InlineLabel name="Mode">
            <ModeField
              value={(moveState as Workout).mode}
              disabled={disabled}
            />
          </InlineLabel>

          <InlineLabel name="Rest">
            <RestField rest={(moveState as Workout).rest} disabled={disabled} />
          </InlineLabel>
          <BlockLabel name="Movements">
            <MovementsField
              movements={(moveState as Workout).movements}
              mode={(moveState as Workout).mode}
              modalMode={mode}
              disabled={disabled}
            />
            {(mode === ModalMode.Add || mode === ModalMode.Edit) && (
              <AddMovementButton />
            )}
          </BlockLabel>
        </>
      )}
      {(moveState?.type === MovementType.Exercise ||
        moveState?.type === MovementType.Workout) && (
        <BlockLabel name="Tags">
          <ArchetypesField
            tags={(moveState as Exercise | Workout).tags}
            modalMode={mode}
            disabled={disabled}
          />
        </BlockLabel>
      )}
      <ButtonRow config={btnConfig} />
    </form>
  );
};

export default MovementForm;
