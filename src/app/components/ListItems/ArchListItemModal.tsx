import React, { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ListItemMenuButton } from '../Buttons';

import { ListItem } from './index';

import { useMoveDispatch } from '../../context/MoveContext';

import { Archetype } from '../../common/types';

const ArchListItemModal: React.FC<{
  archetype: Archetype;
  active: boolean;
}> = ({ archetype, active }) => {
  const themeContext = useContext(ThemeContext);
  const moveDispatch = useMoveDispatch();

  // const btnRef = useRef<HTMLDivElement>(null);

  function toggleArch() {
    moveDispatch({
      type: 'MOVE_CHANGE_ARCH',
      value: archetype.id,
    });
  }

  // const active = filterState.archs.includes(archetype.name);

  return (
    <ArchListItemModalWrapper
      color={
        active
          ? themeContext.color.orange[500]
          : themeContext.mode.colorOpacity[200]
      }
      onClick={toggleArch}
    >
      <p className="name">{archetype.name}</p>
    </ArchListItemModalWrapper>
  );
};

const ArchListItemModalWrapper = styled(ListItem)`
  height: 100%;
  align-items: center;
  .name {
    padding: 0.5rem;
  }
`;

export default ArchListItemModal;
