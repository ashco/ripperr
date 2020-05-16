import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'store';
import { setModalMode, setIsPointerDisabled } from 'store/ui';
import styled, { ThemeContext } from 'styled-components';

import Button from 'components/Button';

import { useMoveDispatch } from 'context/MoveContext';
import Icon from 'icons';
import { MovementType } from 'types/enums';
import { Movement } from 'store/moves';
// import { Movement } from 'types/types';
import Modal from 'components/Modal';
import ModalBackground from 'components/ModalBackground';

const OptionMenuButton: React.FC<{
  movement: Movement;
}> = ({ movement }) => {
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const moveDispatch = useMoveDispatch();

  function handleView(): void {
    moveDispatch({ type: 'MOVE_SET', value: movement });
    dispatch(setModalMode('VIEW'));
  }

  function handleEdit(): void {
    moveDispatch({ type: 'MOVE_SET', value: movement });
    dispatch(setModalMode('EDIT'));
  }

  function handleDelete(): void {
    moveDispatch({ type: 'MOVE_SET', value: movement });
    dispatch(setModalMode('DELETE'));
  }

  function openMenu(): void {
    setMenuOpen(true);
    dispatch(setIsPointerDisabled(true));
  }

  function closeMenu(): void {
    setMenuOpen(false);
    dispatch(setIsPointerDisabled(false));
    document.removeEventListener('click', closeMenu);
  }

  useEffect(() => {
    if (menuOpen) {
      console.log('menu open');
      document.addEventListener('click', closeMenu);

      // const isNumber = (arg) => typeof arg === 'number';

      const offsetHeight = menuRef?.current?.offsetHeight;
      const offsetWidth = menuRef?.current?.offsetWidth;
      const offsetTop = menuRef?.current?.offsetTop;
      const offsetLeft = menuRef?.current?.offsetLeft;
      // console.log({ offsetHeight, offsetWidth, offsetTop, offsetLeft });
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
      <ListItemMenuWrapper ref={menuRef} isOpen={menuOpen}>
        {/* {movement.type === MovementType.Workout && (
          <Button onClick={() => console.log('Starting!!')}>Start</Button>
        )} */}
        <Button onClick={handleView}>View</Button>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ListItemMenuWrapper>
    </>
  );
};
// <>
//   <StyledOptionButton onClick={openMenu}>
//     <Icon name="bars" />
//   </StyledOptionButton>
//   <ListItemMenuWrapper ref={menuRef} open={menuOpen}>
//     {movement.type === MovementType.Workout && (
//       <Button onClick={() => console.log('Starting!!')}>Start</Button>
//     )}
//     <Button onClick={handleView}>View</Button>
//     <Button onClick={handleEdit}>Edit</Button>
//     <Button onClick={handleDelete}>Delete</Button>
//   </ListItemMenuWrapper>
// </>

const StyledOptionButton = styled.button`
  border: none;
  background: none;
  height: 1.75rem;
  width: 1.75rem;
  cursor: pointer;

  svg path {
    fill: ${(p) => p.theme.mode.color[200]};
  }
  &:hover {
    svg path {
      fill: ${(p) => p.theme.mode.color[100]};
    }
  }
`;

const ListItemMenuWrapper = styled.div<{ isOpen: boolean }>`
  pointer-events: all;
  position: fixed;
  opacity: 0;
  display: ${(p) => (p.isOpen ? 'grid' : 'none')};
  grid-auto-rows: auto;
  background-color: ${(p) => p.theme.mode.background[200]};
  box-shadow: ${(p) => p.theme.shadow[2]};
  width: 6rem;
  z-index: 20;
  button {
    border-bottom: none;
  }
  &:last-child {
    border-bottom: 2px solid ${(p) => p.theme.mode.color[100]};
  }
`;

export default OptionMenuButton;
