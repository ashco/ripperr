import React, { useContext } from 'react';

import StyledDeleteMovementContainer from './style';

import { useModalDispatch } from 'context/ModalContext';
import { useMoveState } from 'context/MoveContext';
import { AuthUserContext, FirebaseContext } from 'context';
import ButtonRow from 'components/ButtonRow';

import { MovementType } from 'types/enums';

const DeleteMovementContainer: React.FC = () => {
  const modalDispatch = useModalDispatch();
  const moveState = useMoveState();

  const authUser = useContext(AuthUserContext);
  const firebase = useContext(FirebaseContext);

  if (moveState === null) {
    throw Error('moveState === null!');
  }

  function handleDelete(): void {
    console.log(moveState);

    let firebaseFnc;
    if (moveState?.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetype;
    } else if (moveState?.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercise;
    } else if (moveState?.type === MovementType.Workout) {
      firebaseFnc = firebase.workout;
    } else {
      throw Error('moveState type is not recognized!');
    }

    if (authUser && moveState.id) {
      firebaseFnc(authUser.uid, moveState.id)
        .delete()
        .then(() => console.log(`${moveState.type} Deleted: ${moveState.name}`))
        .catch((err) => console.error(err));
    } else {
      throw Error('No authUser && moveState.id!');
    }
  }

  function onDelete(): void {
    handleDelete();
    modalDispatch({ type: 'MODAL_CLOSE' });
  }

  const btnConfig = {
    cancelBtn: {
      text: 'Cancel',
      onClick: (): void => modalDispatch({ type: 'MODAL_CLOSE' }),
    },
    actionBtn: {
      text: 'Delete',
      onClick: onDelete,
      className: 'btn-delete',
    },
  };

  let moveText;
  switch (moveState.type) {
    case 'ARCHETYPE':
      moveText = 'Archetype';
      break;
    case 'EXERCISE':
      moveText = 'Exercise';
      break;
    case 'WORKOUT':
      moveText = 'Workout';
      break;
    default:
      break;
  }

  return (
    <StyledDeleteMovementContainer>
      <p>Do you want to delete this {moveText}?</p>
      <ButtonRow config={btnConfig} />
    </StyledDeleteMovementContainer>
  );
};

export default DeleteMovementContainer;
