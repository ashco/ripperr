import React from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ListItem } from './index';

import { useMoveDispatch } from '../../context/MoveContext';

import { Archetype } from '../../types/types';

const ArchListItemForm: React.FC<{
  archetype: Archetype;
  active: boolean;
  disabled: boolean;
}> = ({ archetype, active, disabled }) => {
  const themeContext = React.useContext(ThemeContext);
  const moveDispatch = useMoveDispatch();

  function toggleArch() {
    moveDispatch({
      type: 'MOVE_CHANGE_ARCH',
      value: archetype.id,
    });
  }

  return (
    <ArchListItemModalWrapper
      color={
        active
          ? themeContext.color.orange[500]
          : themeContext.mode.colorOpacity[200]
      }
      onClick={toggleArch}
      active={active}
      disabled={disabled}
    >
      <p className="name">{archetype.name}</p>
    </ArchListItemModalWrapper>
  );
};

// const ArchListItemModalWrapper = styled(ListItem)<{
//   disabled?: boolean;
//   active?: boolean;
// }>`
//   box-shadow: ${(props) => props.theme.shadow[0]};
//   height: 100%;
//   align-items: center;
//   p.name {
//     padding: 0.5rem;
//     color: ${(props) =>
//       props.disabled ? props.theme.mode.color[200] : 'default'};
//   }
//   pointer-events: ${(props) => (props.disabled ? 'none' : 'default')};
//   margin-right: 1rem;
// `;
const ArchListItemModalWrapper = styled.li<{
  disabled?: boolean;
  active?: boolean;
}>`
  display: grid;
  height: 2rem;
  align-items: center;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'default')};
  background: ${({ theme }) => theme.mode.background[300]};
  border: 3px solid ${(props) => props.color};
  border-radius: 3px;
  cursor: pointer;
  p.name {
    padding: 0.25rem 0.5rem;
    color: default;
    font-size: 16px;
    line-height: 1.15;
  }
`;

export default ArchListItemForm;
