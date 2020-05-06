import React from 'react';

import TextareaAutosize from 'react-textarea-autosize';

import { AuthUserContext, FirebaseContext, MovementListContext } from 'context';
import { useMoveState, useMoveDispatch } from 'context/MoveContext';
import { useModalDispatch } from 'context/ModalContext';

import MovementFormWrapper from './style';

import ArchetypesField from './ArchetypesField';
import AddMovementButton from './AddMovementButton';
import Label from './Label';
import ModeField from './ModeField';
import MovementsField from './MovementsField';
import RestField from './RestField';
import ButtonRow from 'components/ButtonRow';

import useCurrentWidth from 'hooks/useCurrentWidth';
import singleCapString from 'utils/singleCapString';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  ButtonRowProps,
} from 'types/types';
import { ModalMode, MovementType } from 'types/enums';

const MovementForm: React.FC<{
  mode: ModalMode.Edit | ModalMode.View;
}> = ({ mode }) => {
  const firebase = React.useContext(FirebaseContext);
  const authUser = React.useContext(AuthUserContext);
  const movementList = React.useContext(MovementListContext);

  const moveDispatch = useMoveDispatch();
  const modalDispatch = useModalDispatch();
  const moveState = useMoveState();

  const isDisabled = mode === ModalMode.View;
  const isNewEntry = !moveState?.id;
  // TODO - update useCurrentWidth to listen on window resize, no setTimeout usage
  // const isMobile = useCurrentWidth() < 600;
  const isMobile = false;

  let moveList: Archetype[] | Exercise[] | Workout[];
  switch (moveState?.type) {
    case MovementType.Archetype:
      moveList = movementList.archetypes;
      break;
    case MovementType.Exercise:
      moveList = movementList.exercises;
      break;
    case MovementType.Workout:
      moveList = movementList.workouts;
      break;
    default:
      // break;
      throw Error('No MovementType specified!');
  }

  // ========= MOVEMENT FUNCTIONS =========
  function handleUpdateMovement(moveState: Movement): void {
    let firebaseFnc;

    switch (moveState.type) {
      case MovementType.Archetype:
        firebaseFnc = firebase.archetype;
        break;
      case MovementType.Exercise:
        firebaseFnc = firebase.exercise;
        break;
      case MovementType.Workout:
        firebaseFnc = firebase.workout;
        break;
      default:
        throw Error('moveState type is not recognized');
    }

    if (authUser && moveState.id) {
      // Check that name is unique or matches with current id

      const moveObj: Movement = { ...moveState };
      moveObj.lastModified = firebase.getTimestamp();

      firebaseFnc(authUser.uid, moveState.id)
        .update(moveObj)
        .then(() => {
          console.log(
            `${singleCapString(moveState?.type)} Updated: ${moveObj.name}`,
          );
          modalDispatch({ type: 'MODAL_VIEW' });
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

    switch (moveState.type) {
      case MovementType.Archetype:
        firebaseFnc = firebase.archetypes;
        break;
      case MovementType.Exercise:
        firebaseFnc = firebase.exercises;
        break;
      case MovementType.Workout:
        firebaseFnc = firebase.workouts;
        break;
      default:
        throw Error('moveState.type is not recognized');
    }

    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();
      // TODO Check that name is unique

      const moveObj: Movement = { ...moveState };
      moveObj.lastModified = firebase.getTimestamp();
      // const move
      docRef
        .set(moveObj)
        .then(() => {
          console.log(
            `${singleCapString(moveState?.type)} Added: ${moveObj.name}`,
          );
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

    if (!moveState) throw Error('No moveState detected!');

    if (mode === ModalMode.Edit) {
      moveState.id
        ? handleUpdateMovement(moveState)
        : handleCreateMovement(moveState);
    } else if (mode === ModalMode.View) {
      modalDispatch({ type: 'MODAL_EDIT' });
    } else {
      throw Error('Unsupported ModalMode provided.');
    }
  }

  function handleClose(): void {
    if (mode === ModalMode.View || isNewEntry) {
      modalDispatch({ type: 'MODAL_CLOSE' });
      moveDispatch({ type: 'MOVE_CLEAR' });
    } else if (mode === ModalMode.Edit) {
      // Have moveState reset back to original non-edited state
      const initMoveState = moveList.find((move) => move.id === moveState?.id);
      modalDispatch({ type: 'MODAL_VIEW' });
      moveDispatch({ type: 'MOVE_SET', value: initMoveState });
    } else {
      throw Error('Unsupported ModalMode provided.');
    }
  }

  // BUTTON CONFIGURATION LOGIC
  const btnConfig: ButtonRowProps = {
    cancelBtn: {
      onClick: handleClose,
      text: '',
    },
    actionBtn: {
      text: '',
    },
  };
  switch (mode) {
    case ModalMode.View:
      btnConfig.cancelBtn.text = 'Close';
      btnConfig.actionBtn.text = 'Edit';
      break;
    case ModalMode.Edit:
      btnConfig.cancelBtn.text = 'Cancel';
      btnConfig.actionBtn.text = isNewEntry ? 'Create' : 'Update';
      break;
    default:
      break;
  }

  return (
    <MovementFormWrapper onSubmit={handleSubmit} noValidate>
      {mode === ModalMode.Edit && (
        <Label text="Name:" display={isMobile ? 'block' : 'inline'}>
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
            disabled={isDisabled}
            autoFocus
          />
        </Label>
      )}
      {(!isDisabled || moveState.description.length > 0) && (
        <Label
          text="Description:"
          display={isMobile ? 'block' : isDisabled ? 'block' : 'inline'}
        >
          <TextareaAutosize
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
            disabled={isDisabled}
            maxRows={4}
          />
        </Label>
      )}
      {moveState?.type === MovementType.Workout && (
        <>
          <Label text="Mode:" display={isMobile ? 'block' : 'inline'}>
            <ModeField
              value={(moveState as Workout).mode}
              isDisabled={isDisabled}
            />
          </Label>

          <Label text="Rest:" display={isMobile ? 'block' : 'inline'}>
            <RestField
              rest={(moveState as Workout).rest}
              isDisabled={isDisabled}
            />
          </Label>
          <Label text="Movements:" display="block">
            <MovementsField
              movements={(moveState as Workout).movements}
              mode={(moveState as Workout).mode}
              modalMode={mode}
              isDisabled={isDisabled}
            />
            {mode === ModalMode.Edit && <AddMovementButton />}
          </Label>
        </>
      )}
      {(moveState?.type === MovementType.Exercise ||
        moveState?.type === MovementType.Workout) &&
        (!isDisabled || (moveState as Exercise | Workout).tags.length > 0) && (
          <Label text="Tags:" display="block">
            <ArchetypesField
              tags={(moveState as Exercise | Workout).tags}
              modalMode={mode}
              isDisabled={isDisabled}
            />
          </Label>
        )}
      <ButtonRow config={btnConfig} />
    </MovementFormWrapper>
  );
};

export default MovementForm;
