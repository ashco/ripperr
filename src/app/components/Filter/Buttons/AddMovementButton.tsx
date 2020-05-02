import React, { useState, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Button } from '../../Buttons';

import Plus from '../../../icons/Plus';

const AddMovementButton: React.FC<{ openModal: () => void }> = ({
  openModal,
}) => {
  const themeContext = useContext(ThemeContext);
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
      <Plus
        color={
          btnHovered
            ? themeContext.mode.background[200]
            : themeContext.mode.color[200]
        }
      />
    </StyledAddMovementButton>
  );
};

const StyledAddMovementButton = styled(Button)`
  /* display: grid;
  place-items: center; */
  /* background-color: ${(props) => props.theme.mode.background[300]}; */
  /* border-radius: 5px; */
  /* box-shadow: ${(props) => props.theme.shadow[2]};
  border: none; */
  svg {
    width: 1.5rem;
  }
`;

export default AddMovementButton;
