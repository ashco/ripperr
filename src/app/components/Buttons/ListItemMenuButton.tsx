import React, { useState, useEffect, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Button } from '../Buttons';

import { useMoveDispatch } from '../../context/MoveContext';
import { useModalDispatch } from '../../context/ModalContext';

import Bars from '../../icons/Bars';
import { MovementType } from '../../common/enums';
import { Movement } from '../../common/types';

const ListItemMenuButton: React.FC<{
  movement: Movement;
  // ref: React.RefObject<HTMLButtonElement>;
}> = ({ movement }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const themeContext = useContext(ThemeContext);

  const moveDispatch = useMoveDispatch();
  const modalDispatch = useModalDispatch();

  function handleView(): void {
    moveDispatch({ type: 'MOVE_SET', value: movement });
    modalDispatch({ type: 'MODAL_VIEW' });
  }

  function handleEdit(): void {
    moveDispatch({ type: 'MOVE_SET', value: movement });
    modalDispatch({ type: 'MODAL_EDIT' });
  }

  function handleDelete(): void {
    moveDispatch({ type: 'MOVE_SET', value: movement });
    modalDispatch({ type: 'MODAL_DELETE' });
  }

  function openMenu(): void {
    setMenuOpen(true);
  }

  function closeMenu(): void {
    setMenuOpen(false);
    document.removeEventListener('click', closeMenu);
  }

  function toggleHover() {
    setBtnHovered((hovered) => !hovered);
  }

  useEffect(() => {
    if (menuOpen) {
      console.log('open');
      document.addEventListener('click', closeMenu);
    } else {
      console.log('closed');
    }
  }, [menuOpen]);

  return (
    <>
      <StyledListItemMenuButton
        onClick={openMenu}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        <Bars
          color={
            btnHovered
              ? themeContext.mode.color[100]
              : themeContext.mode.color[200]
          }
        />
      </StyledListItemMenuButton>
      <ListItemMenuWrapper open={menuOpen}>
        {movement.type === MovementType.Workout && (
          <Button onClick={() => console.log('Starting!!')}>Start</Button>
        )}
        <Button onClick={handleView}>View</Button>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>

        {/* <MovementFormButton formMode={FormMode.View} movement={movement} />
        <MovementFormButton formMode={FormMode.Edit} movement={movement} />
        <DeleteButton text={deleteText} handleDelete={handleDelete} /> */}
      </ListItemMenuWrapper>
    </>
  );
};

const StyledListItemMenuButton = styled.button`
  border: none;
  background: none;
  height: 1.75rem;
  width: 1.75rem;
  cursor: pointer;
  svg {
    height: 100%;
    width: 100%;
  }
`;

const ListItemMenuWrapper = styled.div<{ open: boolean }>`
  position: absolute;
  display: ${(props) => (props.open ? 'grid' : 'none')};
  /* display: grid; */
  grid-auto-rows: auto;
  background-color: ${(props) => props.theme.color.neutral[200]};
  box-shadow: ${(props) => props.theme.shadow[2]};
  width: 6rem;
  /* padding: 1rem; */
`;

export default ListItemMenuButton;
