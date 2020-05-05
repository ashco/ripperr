import React from 'react';
import { ThemeContext } from 'styled-components';

import { useModalDispatch } from 'context/ModalContext';
import { useAddMoveMode } from 'context/AddMoveModeContext';

import ButtonWrapper from 'domain/FilterBar/ButtonWrapper';

import Times from 'icons/Times';

const AddBar: React.FC = () => {
  const modalDispatch = useModalDispatch();
  const setAddMoveMode = useAddMoveMode()[1];

  const themeContext = React.useContext(ThemeContext);
  const [btnHovered, setBtnHovered] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  function toggleHover() {
    setBtnHovered((hovered) => !hovered);
  }

  function handleClose(): void {
    modalDispatch({ type: 'MODAL_EDIT' });
    setAddMoveMode(false);
  }

  return (
    <ul>
      <div className="list-group left">
        <li className="cancel-btn">
          <ButtonWrapper
            onClick={handleClose}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            ref={btnRef}
          >
            <Times
              color={
                btnHovered
                  ? themeContext.mode.background[200]
                  : themeContext.mode.color[200]
              }
            />
          </ButtonWrapper>
        </li>
      </div>
    </ul>
  );
};

export default AddBar;
