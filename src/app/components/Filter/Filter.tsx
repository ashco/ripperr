import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useFilterState, useFilterDispatch } from '../../context/FilterContext';

import { ArchetypeList } from '../../components/Movements';
import FilterBar from './FilterBar';

import { Archetype } from '../../common/types';

const Filter: React.FC<{
  archetypeList: Archetype[] | null;
}> = ({ archetypeList }) => {
  const filterState = useFilterState();
  const filterDispatch = useFilterDispatch();

  const filterRef = useRef<HTMLDivElement>(null);

  function handleFilterModeOff(e: any) {
    if (filterState.active) {
      if (!filterRef?.current?.contains(e.target)) {
        filterDispatch({ type: 'FILTER_MODE_OFF' });
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleFilterModeOff);

    return (): void => {
      document.removeEventListener('click', handleFilterModeOff);
    };
  });

  return (
    <FilterContainer active={filterState.active} ref={filterRef}>
      {filterState.active && <ArchetypeList archetypeList={archetypeList} />}
      <FilterBar />
    </FilterContainer>
  );
};

const FilterContainer = styled.div<{ active: boolean }>`
  padding: 1rem;
  display: grid;
  gap: 1rem;
`;

export default Filter;
