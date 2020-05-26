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
    <StyledAddMoveButton onClick={handleClick}>
      Add Movement
    </StyledAddMoveButton>
  );
};

const StyledAddMoveButton = styled(Button)`
  width: 12rem;
  justify-self: center;
`;

export default AddMoveButton;
