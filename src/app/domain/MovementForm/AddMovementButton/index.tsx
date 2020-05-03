import React from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';

import { useModalDispatch } from '@/context/ModalContext';
import { useAddMoveMode } from '@/context/AddMoveModeContext';

const AddMovementButton: React.FC = () => {
  const modalDispatch = useModalDispatch();
  const setAddMoveMode = useAddMoveMode()[1];

  function handleClick(e: any) {
    e.preventDefault();

    // Hide modal
    modalDispatch({ type: 'MODAL_CLOSE' });
    setAddMoveMode(true);

    // initiate new movement select mode
    // 1. Cancel button appears that shows modal again
    // 2. menulistitems onclick function changes to adding new movement
  }

  return (
    <StyledAddMovementButton onClick={handleClick}>
      Add Movement
    </StyledAddMovementButton>
  );
};

const StyledAddMovementButton = styled(Button)`
  width: 12rem;
  justify-self: center;
`;

export default AddMovementButton;
