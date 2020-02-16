import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { Button } from '.';

import Plus from '../../icons/Plus';

const AddMovementButton: React.FC<{ openModal: () => void }> = ({
  openModal,
}) => {
  const [btnHovered, setBtnHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  function toggleHover() {
    setBtnHovered((hovered) => !hovered);
  }

  return (
    <StyledAddMovementButton
      onClick={openModal}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      ref={btnRef}
    >
      <Plus color={btnHovered ? 'black' : 'gray'} />
    </StyledAddMovementButton>
  );
};

const StyledAddMovementButton = styled(Button)`
  display: grid;
  place-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.shadow[2]};
  border: none;
  svg {
    width: 1.5rem;
  }
`;

export default AddMovementButton;
