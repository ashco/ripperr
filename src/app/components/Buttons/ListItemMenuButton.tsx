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
  const menuRef = useRef<HTMLDivElement>(null);

  function closeMenu(e: any): void {
    if (menuRef && menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
      document.removeEventListener('click', closeMenu);
      console.log('in close menu');
    }
    console.log('out close menu');
  }

  function openMenu(): void {
    if (!menuOpen) {
      setMenuOpen(true);
      document.addEventListener('click', closeMenu);
    }
  }

  return (
    <div>
      <StyledListItemMenuButton onClick={openMenu}>
        <Bars color="grey" />
      </StyledListItemMenuButton>
      {menuOpen ? (
        <ListItemMenuWrapper ref={menuRef}>
          {type === MovementType.Workout && <Button>Start</Button>}
          <MovementFormButton formMode={FormMode.Edit} movement={movement} />
          <DeleteButton text={deleteText} handleDelete={handleDelete} />
        </ListItemMenuWrapper>
      ) : null}
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

const ListItemMenuWrapper = styled.div`
  position: absolute;
  display: grid;
  grid-auto-rows: auto;
  background-color: ${(props) => props.theme.color.neutral[200]};
  box-shadow: ${(props) => props.theme.shadow[2]};
  width: 6rem;
`;

export default ListItemMenuButton;
