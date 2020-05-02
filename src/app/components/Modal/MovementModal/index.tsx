import React from 'react';

import MovementForm from '@/components/MovementForm';

import MovementModalWrapper from './style';

import { useMoveState } from '@/context/MoveContext';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  ButtonRowProps,
} from '@/types/types';
import { ModalMode, MovementType } from '@/types/enums';

const MovementModal: React.FC<{
  mode: ModalMode.Add | ModalMode.Edit | ModalMode.View;
}> = ({ mode }) => {
  // ============ MODE SPECIFIC VALUES ============

  // let movementText = 'Archetype';
  // if (moveState?.type === MovementType.Exercise) {
  //   movementText = 'Exercise';
  // } else if (moveState?.type === MovementType.Workout) {
  //   movementText = 'Workout';
  // }

  // let actionText = 'Add';
  // let submitButton = 'Submit';

  // if (mode === ModalMode.Edit) {
  //   actionText = 'Edit';
  //   submitButton = 'Update';
  // } else if (mode === ModalMode.View) {
  //   actionText = 'View';
  //   submitButton = 'Edit';
  // }

  // const text = {
  //   title: `${actionText} ${movementText}`,
  //   submitButton,
  // };

  // const disabled = mode === ModalMode.View;

  // console.log(moveState);

  // const showDesc =
  //   mode !== ModalMode.View ||
  //   (mode === ModalMode.View && (moveState as Movement).description !== '');

  const moveState = useMoveState();

  let movementText = 'Archetype';
  if (moveState?.type === MovementType.Exercise) {
    movementText = 'Exercise';
  } else if (moveState?.type === MovementType.Workout) {
    movementText = 'Workout';
  }

  let actionText = 'Add';

  if (mode === ModalMode.Edit) {
    actionText = 'Edit';
  } else if (mode === ModalMode.View) {
    actionText = 'View';
  }

  const title = `${actionText} ${movementText}`;

  return (
    <MovementModalWrapper type={(moveState as Movement).type}>
      <h1 className="title">{title}</h1>
      <MovementForm mode={mode} />
    </MovementModalWrapper>
  );
};

export default MovementModal;
