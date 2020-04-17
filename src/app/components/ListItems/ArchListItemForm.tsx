import React, { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ListItem } from './index';

import { useMoveDispatch } from '../../context/MoveContext';

import { Archetype } from '../../common/types';

const ArchListItemForm: React.FC<{
  archetype: Archetype;
  active: boolean;
  disabled: boolean;
}> = ({ archetype, active, disabled }) => {
  const themeContext = useContext(ThemeContext);
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

const ArchListItemModalWrapper = styled(ListItem)<{
  disabled?: boolean;
  active?: boolean;
}>`
  box-shadow: ${(props) => props.theme.shadow[0]};
  height: 100%;
  align-items: center;
  p.name {
    padding: 0.5rem;
    color: ${(props) =>
      props.disabled ? props.theme.mode.color[200] : 'default'};
  }
  pointer-events: ${(props) => (props.disabled ? 'none' : 'default')};
  margin-right: 1rem;
`;

export default ArchListItemForm;
