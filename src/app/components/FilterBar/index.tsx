import React from 'react';

import { useFilterState, useFilterDispatch } from '@context/FilterContext';

import { ArchetypeList } from '../Movements';
import FilterInput from './FilterInput';

import FilterBarContainer from './style';

import { Archetype } from '@types/types';

const FilterBar: React.FC<{
  archetypeList: Archetype[] | null;
}> = ({ archetypeList }) => {
  const filterState = useFilterState();
  const filterDispatch = useFilterDispatch();

  const filterRef = React.useRef<HTMLDivElement>(null);

  function handleFilterModeOff(e: any) {
    if (filterState.active) {
      if (!filterRef?.current?.contains(e.target)) {
        filterDispatch({ type: 'FILTER_MODE_OFF' });
      }
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleFilterModeOff);

    return (): void => {
      document.removeEventListener('click', handleFilterModeOff);
    };
  });

  const filtering =
    filterState.value.length > 0 || filterState.archs.length > 0;

  return (
    <FilterBarContainer
      active={filterState.active}
      filtering={filtering}
      ref={filterRef}
    >
      {filterState.active && <ArchetypeList archetypeList={archetypeList} />}
      <FilterInput />
    </FilterBarContainer>
  );
};

export default FilterBar;
