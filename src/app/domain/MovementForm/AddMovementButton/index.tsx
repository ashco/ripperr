import React from 'react';

import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';
import styled from 'styled-components';

import Button from 'components/Button';

// import { useModalDispatch } from 'context/ModalContext';
import { useAddMoveMode } from 'context/AddMoveModeContext';

const AddMovementButton: React.FC = () => {
  // const modalDispatch = useModalDispatch();
  const dispatch = useDispatch();
  const setAddMoveMode = useAddMoveMode()[1];

  function handleClick(e: any) {
    e.preventDefault();

    dispatch(setModalMode({ modalMode: null }));
    setAddMoveMode(true);
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
