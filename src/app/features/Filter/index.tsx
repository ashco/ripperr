import React from 'react';
import { useSelector, useDispatch, batch } from 'store';
import { showFilter } from 'store/filter';
import { setIsPointerDisabled } from 'store/ui';

import TagList from './TagList';
import FilterInput from './FilterInput';

import FilterContainer from './style';

const Filter: React.FC = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter);

  const filterRef = React.useRef<HTMLDivElement>(null);

  function handleFilterModeOff(e: any): void {
    if (filter.open) {
      if (!filterRef?.current?.contains(e.target)) {
        batch(() => {
          dispatch(setIsPointerDisabled(false));
          dispatch(showFilter({ open: false }));
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

  return (
    <FilterContainer active={filter.active} ref={filterRef}>
      {filter.open && <TagList filter={filter} />}
      <FilterInput filter={filter} />
    </FilterContainer>
  );
};

export default Filter;
