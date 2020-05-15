import React from 'react';
import { useSelector, useDispatch } from 'store';

import ArchetypeList from './ArchetypeList';
import FilterInput from './FilterInput';

import FilterContainer from './style';

import { Archetype } from 'types/types';

const Filter: React.FC<{
  archetypeList: Archetype[] | null;
}> = ({ archetypeList }) => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filterRef = React.useRef<HTMLDivElement>(null);

  function handleFilterModeOff(e: any) {
    if (filter.active) {
      if (!filterRef?.current?.contains(e.target)) {
        dispatch({ type: 'FILTER_OFF' });
      }
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleFilterModeOff);

    return (): void => {
      document.removeEventListener('click', handleFilterModeOff);
    };
  });

  const filtering = filter.value.length > 0 || filter.tags.length > 0;

  return (
    <FilterContainer
      active={filter.active}
      filtering={filtering}
      ref={filterRef}
    >
      {filter.active && <ArchetypeList archetypeList={archetypeList} />}
      <FilterInput />
    </FilterContainer>
  );
};

export default Filter;
