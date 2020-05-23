import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch, batch } from 'store';
import { setModalMode, setIsPointerDisabled } from 'store/ui';
import { setActiveMove } from 'store/moves';

import styled from 'styled-components';

import Button from 'components/Button';

import Icon from 'components/Icon';
import { MovementType } from 'types';
import { Movement } from 'types';

const OptionMenuButton: React.FC<{
  // movement: Movement;
  data: Movement;
  type: MovementType;
}> = ({ data, type }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const { id, name } = data;

  function handleView(): void {
    batch(() => {
      dispatch(setActiveMove(id));
      dispatch(setModalMode({ modalMode: 'VIEW' }));
    });
  }

  function handleEdit(): void {
    batch(() => {
      dispatch(setActiveMove(id));
      dispatch(setModalMode({ modalMode: 'EDIT' }));
    });
  }

  function handleDelete(): void {
    batch(() => {
      dispatch(setActiveMove(id));
      dispatch(setModalMode({ modalMode: 'DELETE' }));
    });
  }

  function openMenu(): void {
    setIsOpen(true);
    dispatch(setIsPointerDisabled(true));
  }

  function closeMenu(): void {
    setIsOpen(false);
    dispatch(setIsPointerDisabled(false));
    document.removeEventListener('click', closeMenu);
  }

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  return (
    <>
      <StyledOptionButton
        onClick={openMenu}
        aria-label={`${name} ${type.toLowerCase()} option menu`}
      >
        <Icon name="bars" />
      </StyledOptionButton>
      {isOpen && (
        <ListItemMenuWrapper ref={menuRef}>
          <Button onClick={handleView}>View</Button>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ListItemMenuWrapper>
      )}
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
    fill: ${(p) => p.theme.mode.color[200]};
  }
  &:hover {
    svg path {
      fill: ${(p) => p.theme.mode.color[100]};
    }
  }
`;

const ListItemMenuWrapper = styled.div`
  pointer-events: all;
  position: fixed;
  opacity: 0;
  display: grid;
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
