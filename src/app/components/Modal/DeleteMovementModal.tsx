import React, { useContext } from 'react';
import styled from 'styled-components';

import { ModalWrapper } from './styles';

// import { FormWrapper } from '../Forms/styles';
import ButtonRow from '../Forms/ButtonRow';
// import { Button } from '../Buttons';

import { useModalDispatch } from '../../context/ModalContext';
import { useMoveState } from '../../context/MoveContext';
import { AuthUserContext, FirebaseContext } from '../../context';

import { MovementType } from '../../common/enums';

const DeleteModal: React.FC = () => {
  const modalDispatch = useModalDispatch();
  const moveState = useMoveState();

  const authUser = useContext(AuthUserContext);
  const firebase = useContext(FirebaseContext);

  // const deleteText = `Do you want to delete this archetype: ${archetype.name}?`;

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
    },
  };

  return (
    <DeleteModalWrapper>
      <p>
        Do you want to delete this {moveState.type}? {moveState.name}
      </p>
      <ButtonRow config={btnConfig} />
    </DeleteModalWrapper>
  );
};

const DeleteModalWrapper = styled(ModalWrapper)`
  display: grid;
  gap: 1rem;
  p {
    font-size: ${(p) => p.theme.font[3]};
  }
`;

export default DeleteModal;
