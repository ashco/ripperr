import React from 'react';
import { useSelector, useDispatch, batch } from 'store';
import { toggleFilter } from 'store/filter';
import { setIsPointerDisabled } from 'store/ui';

import TagList from './TagList';
import FilterInput from './FilterInput';

import FilterContainer from './style';

const Filter: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);

  const filterRef = React.useRef<HTMLDivElement>(null);

  function handleFilterModeOff(e: any) {
    if (filter.active) {
      if (!filterRef?.current?.contains(e.target)) {
        batch(() => {
          dispatch(setIsPointerDisabled(false));
          dispatch(toggleFilter({ active: false }));
        });
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
      {filter.active && <TagList filter={filter} />}
      <FilterInput />
    </FilterContainer>
  );
};

export default Filter;
