import React from 'react';

import MovementForm from 'domain/MovementForm';

import StyledMovementContainer from './style';

import { useMoveState } from 'context/MoveContext';

import { Movement } from 'types/types';
import { ModalMode, MovementType } from 'types/enums';

// DELETE ME

const MovementContainer: React.FC<{
  mode: ModalMode.Edit | ModalMode.View;
}> = ({ mode }) => {
  const moveState = useMoveState();

  return (
    <StyledMovementContainer type={(moveState as Movement).type}>
      <MovementForm />
    </StyledMovementContainer>
  );
};

export default MovementContainer;
