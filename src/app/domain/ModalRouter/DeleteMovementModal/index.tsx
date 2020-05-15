import React from 'react';
import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';
// import { useModalDispatch } from 'context/ModalContext';
import { useMoveState } from 'context/MoveContext';

import ModalBackground from 'components/ModalBackground';

import DeleteMovementContainer from './style';

import { AuthUserContext, FirebaseContext } from 'context';
import ButtonRow from 'components/ButtonRow';

import { MovementType } from 'types/enums';
import ColorBarWrapper from 'components/ColorBarWrapper';

const DeleteMovementModal = () => {
  // const dispatch = useModalDispatch();
  const dispatch = useDispatch();
  const moveState = useMoveState();

  const authUser = React.useContext(AuthUserContext);
  const firebase = React.useContext(FirebaseContext);

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
    dispatch(setModalMode({ modalMode: null }));
  }

  const btnConfig = {
    cancelBtn: {
      text: 'Cancel',
      onClick: () => dispatch(setModalMode({ modalMode: null })),
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
    <ModalBackground>
      <ColorBarWrapper color="red">
        <DeleteMovementContainer width="32rem">
          <h1 className="header">{moveState?.name}</h1>
          <div className="content">
            <p>Do you want to delete this {moveText}?</p>
            <ButtonRow config={btnConfig} />
          </div>
        </DeleteMovementContainer>
      </ColorBarWrapper>
    </ModalBackground>
  );
};

export default DeleteMovementModal;
