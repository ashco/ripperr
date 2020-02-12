import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Button, MovementFormButton, DeleteButton } from '../Buttons';
import Bars from '../../icons/Bars';
import { MovementType, FormMode } from '../../common/enums';
import { IMovements } from '../../common/types';

const ListItemMenuButton: React.FC<{
  type: MovementType;
  movement: IMovements;
  deleteText: string;
  handleDelete: () => void;
}> = ({ type, movement, deleteText, handleDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  function openMenu(): void {
    setMenuOpen(true);
  }

  function closeMenu(): void {
    // if (menuRef && menuRef.current && !menuRef.current.contains(e.target)) {
    setMenuOpen(false);
    document.removeEventListener('click', closeMenu);
    // }
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
    <div>
      <StyledListItemMenuButton onClick={openMenu}>
        <Bars color="grey" />
      </StyledListItemMenuButton>
      <ListItemMenuWrapper open={menuOpen}>
        {type === MovementType.Workout && (
          <Button onClick={() => console.log('Starting!!')}>Start</Button>
        )}
        <MovementFormButton formMode={FormMode.View} movement={movement} />
        <MovementFormButton formMode={FormMode.Edit} movement={movement} />
        <DeleteButton text={deleteText} handleDelete={handleDelete} />
      </ListItemMenuWrapper>
    </div>
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
