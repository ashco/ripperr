import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { ArchetypeList } from '../../components/Movements';
import FilterBar from './FilterBar';

import { Archetype } from '../../common/types';

const Filter: React.FC<{
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  archetypeList: Archetype[] | null;
  activeArchs: string[];
  setActiveArchs: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ filter, setFilter, archetypeList, activeArchs, setActiveArchs }) => {
  const [filterMode, setFilterMode] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  function handleStopFilterMode(e: any) {
    if (filterMode) {
      if (!filterRef?.current?.contains(e.target)) {
        setFilterMode(false);
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleStopFilterMode);

    return (): void => {
      document.removeEventListener('click', handleStopFilterMode);
    };
  });

  return (
    <FilterContainer filterMode={filterMode} ref={filterRef}>
      {filterMode && (
        <ArchetypeList
          archetypeList={archetypeList}
          activeArchs={activeArchs}
          setActiveArchs={setActiveArchs}
        />
      )}
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        setFilterMode={setFilterMode}
      />
    </FilterContainer>
  );
};

const FilterContainer = styled.div<{ filterMode: boolean }>`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  background: ${(props) => (props.filterMode ? 'black' : 'default')};
`;

export default Filter;
