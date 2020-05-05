import React from 'react';

import MovementForm from 'domain/MovementForm';

import StyledMovementContainer from './style';

import { useMoveState } from 'context/MoveContext';

import { Movement } from 'types/types';
import { ModalMode, MovementType } from 'types/enums';

const MovementContainer: React.FC<{
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
    <StyledMovementContainer type={(moveState as Movement).type}>
      {/* <h1 className="title">{title}</h1> */}
      <MovementForm mode={mode} />
    </StyledMovementContainer>
  );
};

export default MovementContainer;
