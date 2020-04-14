import React, { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ListItemMenuButton } from '../Buttons';

import { ListItem } from './index';

import { useFilterState, useFilterDispatch } from '../../context/FilterContext';

import { Archetype } from '../../common/types';

const ArchetypeListItem: React.FC<{
  archetype: Archetype;
}> = ({ archetype }) => {
  const themeContext = useContext(ThemeContext);
  const filterState = useFilterState();
  const filterDispatch = useFilterDispatch();

  const btnRef = useRef<HTMLDivElement>(null);

  function toggleActive(e: any) {
    if (!btnRef?.current?.contains(e.target)) {
      filterDispatch({ type: 'FILTER_TOGGLE_ARCH', value: archetype.id });
    }
  }

  const active = filterState.archs.includes(archetype.id as string);

  return (
    <ArchetypeListItemWrapper
      color={
        active
          ? themeContext.color.orange[500]
          : themeContext.mode.colorOpacity[200]
      }
      onClick={toggleActive}
    >
      <p className="name">{archetype.name}</p>
      <div className="btn-wrapper">
        <div ref={btnRef}>
          <ListItemMenuButton movement={archetype} />
        </div>
      </div>
    </ArchetypeListItemWrapper>
  );
};

const ArchetypeListItemWrapper = styled(ListItem)`
  height: 100%;
  align-items: center;
  .name {
    padding: 0.5rem;
  }
`;

export default ArchetypeListItem;
