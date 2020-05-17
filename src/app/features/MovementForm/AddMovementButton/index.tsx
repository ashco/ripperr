import React from 'react';

import { useSelector, useDispatch } from 'store';
import { setModalMode, setIsAddMoveMode } from 'store/ui';
import styled from 'styled-components';

import Button from 'components/Button';

const AddMovementButton: React.FC = () => {
  const dispatch = useDispatch();

  function handleClick(e: any) {
    e.preventDefault();

    dispatch(setModalMode({ modalMode: 'CLOSED' }));
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
