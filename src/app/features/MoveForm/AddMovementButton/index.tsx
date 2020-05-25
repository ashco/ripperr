import React from 'react';

import { useDispatch, batch } from 'store';
import { setModalMode, setIsAddMoveMode } from 'store/ui';
import styled from 'styled-components';

import Button from 'components/Button';

const AddMoveButton: React.FC = () => {
  const dispatch = useDispatch();

  function handleClick(e: any): void {
    e.preventDefault();

    batch(() => {
      dispatch(setModalMode({ modalMode: null }));
      dispatch(setIsAddMoveMode(true));
    });
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

export default AddMoveButton;
