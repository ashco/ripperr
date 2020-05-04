import React from 'react';

import MovementForm from '@/domain/EditMovementForm';

import StyledEditMovementContainer from './style';

import { useMoveState } from '@/context/MoveContext';

import { Movement } from '@/types/types';
import { ModalMode, MovementType } from '@/types/enums';

const EditMovementContainer: React.FC<{
  mode: ModalMode.Add | ModalMode.Edit | ModalMode.View;
}> = ({ mode }) => {
  const moveState = useMoveState();

  // let movementText = 'Archetype';
  // if (moveState?.type === MovementType.Exercise) {
  //   movementText = 'Exercise';
  // } else if (moveState?.type === MovementType.Workout) {
  //   movementText = 'Workout';
  // }

  // let actionText = 'Add';

  // if (mode === ModalMode.Edit) {
  //   actionText = 'Edit';
  // } else if (mode === ModalMode.View) {
  //   actionText = 'View';
  // }

  // const title = `${actionText} ${movementText}`;

  return (
    <StyledEditMovementContainer type={(moveState as Movement).type}>
      {/* <h1 className="title">{title}</h1> */}
      <MovementForm mode={mode} />
    </StyledEditMovementContainer>
  );
};

export default EditMovementContainer;
