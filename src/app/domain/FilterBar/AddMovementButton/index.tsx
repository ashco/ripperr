import React, { useState, useContext, useRef } from 'react';
import { ThemeContext } from 'styled-components';

// import { useAddMoveMode } from 'context/AddMoveModeContext';

import ButtonWrapper from '../ButtonWrapper';

import Plus from 'icons/Plus';

import Icon from 'icons';

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
    <ButtonWrapper
      onClick={openModal}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      ref={btnRef}
    >
      {/* <Plus
        color={
          btnHovered
            ? themeContext.mode.background[200]
            : themeContext.mode.color[200]
        }
      /> */}
      <Icon name="plus" className="hoverable" />
    </ButtonWrapper>
  );
};

export default AddMovementButton;
