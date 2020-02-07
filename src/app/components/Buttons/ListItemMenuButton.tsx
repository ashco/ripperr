import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// import Bars from '../../static/icons/bars-solid.svg';
import { Button } from '../Buttons';
import Bars from '../../icons/Bars';

const ListItemMenuButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function closeMenu(e: any): void {
    if (menuRef && menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
      document.removeEventListener('click', closeMenu);
    }
  }

  function openMenu(e: any): void {
    if (!menuOpen) {
      setMenuOpen(true);
      document.addEventListener('click', closeMenu);
    }
  }

  return (
    <ListItemMenuButtonWrapper>
      <button className="menu-btn" onClick={openMenu}>
        <Bars color="grey" />
      </button>
      {menuOpen ? (
        <div ref={menuRef} className="menu">
          <Button>Start</Button>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      ) : null}
    </ListItemMenuButtonWrapper>
  );
};

const ListItemMenuButtonWrapper = styled.div`
  .menu-btn {
    justify-self: end;
    border: none;
    background: none;
    height: 2rem;
    width: 2rem;
    margin: 0.25rem;
    cursor: pointer;
    svg {
      height: 100%;
      width: 100%;
    }
  }
  .menu {
    position: absolute;
    display: grid;
    grid-auto-rows: auto;
    background-color: ${(props) => props.theme.color.neutral[200]};
    box-shadow: ${(props) => props.theme.shadow[2]};
    width: 8rem;
  }
`;

export default ListItemMenuButton;
