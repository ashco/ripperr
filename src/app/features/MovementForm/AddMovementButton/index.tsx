import React from 'react';

import { useSelector, useDispatch } from 'store';
import { setModalMode, setIsAddMoveMode } from 'store/ui';
import styled from 'styled-components';

import Button from 'components/Button';

// import { useModalDispatch } from 'context/ModalContext';
// import { useAddMoveMode } from 'context/AddMoveModeContext';

const AddMovementButton: React.FC = () => {
  // const modalDispatch = useModalDispatch();
  const dispatch = useDispatch();

  function handleClick(e: any) {
    e.preventDefault();

    dispatch(setModalMode(null));
    dispatch(setIsAddMoveMode(true));
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
