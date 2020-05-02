import React from 'react';
import styled from 'styled-components';

import Button from '../../Button';

const AddMovementButton: React.FC = () => {
  function handleClick(e: any) {
    e.preventDefault();

    // Bring up new movement select overlay menu
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
