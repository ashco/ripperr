import React, { useState, useEffect, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import Button from 'components/Button';

import { useMoveDispatch } from 'context/MoveContext';
import { useModalDispatch } from 'context/ModalContext';
import { usePointerEvents } from 'context/PointerEventsContext';

// import TimesSolid from 'icons/times-solid.svg';

// import Bars from 'icons/Bars';
import Icon from 'icons';
import { MovementType } from 'types/enums';
import { Movement } from 'types/types';

const OptionMenuButton: React.FC<{
  movement: Movement;
}> = ({ movement }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const moveDispatch = useMoveDispatch();
  const modalDispatch = useModalDispatch();
  const setPointerEvents = usePointerEvents()[1];

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
    setPointerEvents(false);
  }

  function closeMenu(): void {
    setMenuOpen(false);
    setPointerEvents(true);
    document.removeEventListener('click', closeMenu);
  }

  useEffect(() => {
    if (menuOpen) {
      console.log('menu open');
      document.addEventListener('click', closeMenu);

      const offsetHeight = menuRef?.current?.offsetHeight;
      const offsetWidth = menuRef?.current?.offsetWidth;
      const offsetTop = menuRef?.current?.offsetTop;
      const offsetLeft = menuRef?.current?.offsetLeft;
      if (
        offsetHeight &&
        offsetWidth &&
        offsetTop &&
        offsetLeft &&
        menuRef &&
        menuRef.current
      ) {
        const isOverBottom =
          offsetHeight + offsetTop - document.body.clientHeight >= 0;
        const isOverRight =
          offsetWidth + offsetLeft - document.body.clientWidth >= 0;

        let topPosition = offsetTop;
        let leftPosition = offsetLeft;
        if (isOverBottom) {
          topPosition = offsetTop - menuRef.current.clientHeight - 28;
        }
        if (isOverRight) {
          leftPosition = offsetLeft - menuRef.current.clientWidth + 28;
        }
        menuRef.current.style.top = topPosition + 'px';
        menuRef.current.style.left = leftPosition + 'px';
        menuRef.current.style.opacity = '1';
      }
      return () => document.removeEventListener('click', closeMenu);
    }
  }, [menuOpen]);

  return (
    <>
      <StyledOptionButton onClick={openMenu}>
        <Icon name="bars" />
      </StyledOptionButton>
      <ListItemMenuWrapper ref={menuRef} open={menuOpen}>
        {movement.type === MovementType.Workout && (
          <Button onClick={() => console.log('Starting!!')}>Start</Button>
        )}
        <Button onClick={handleView}>View</Button>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ListItemMenuWrapper>
    </>
  );
};

const StyledOptionButton = styled.button`
  border: none;
  background: none;
  height: 1.75rem;
  width: 1.75rem;
  cursor: pointer;

  svg path {
    fill: ${(props) => props.theme.mode.color[200]};
  }
  &:hover {
    svg path {
      fill: ${(props) => props.theme.mode.color[100]};
    }
  }
`;

const ListItemMenuWrapper = styled.div<{ open: boolean }>`
  pointer-events: all;
  position: fixed;
  opacity: 0;
  display: ${(props) => (props.open ? 'grid' : 'none')};
  grid-auto-rows: auto;
  background-color: ${(props) => props.theme.mode.background[200]};
  box-shadow: ${(props) => props.theme.shadow[2]};
  width: 6rem;
  z-index: 20;
  button {
    border-bottom: none;
  }
  &:last-child {
    border-bottom: 2px solid ${(prop) => prop.theme.mode.color[100]};
  }
`;

export default OptionMenuButton;
