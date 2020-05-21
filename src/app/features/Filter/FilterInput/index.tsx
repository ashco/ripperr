import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';
import { setFilterValue, showFilter, FilterState } from 'store/filter';

import AddMoveButton from '../AddMoveButton';
import ClearFilterButton from '../ClearFilterButton';

const FilterInput: React.FC<{ filter: FilterState }> = ({ filter }) => {
  const dispatch = useDispatch();
  const { isAddMoveMode } = useSelector((state) => state.ui);

  function openModal(): void {
    dispatch(setModalMode({ modalMode: 'ADD' }));
  }

  return (
    <FilterInputWrapper>
      <input
        aria-label="filter-bar"
        type="text"
        placeholder="Filter..."
        value={filter.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setFilterValue(e.target.value))
        }
        onFocus={() => dispatch(showFilter({ open: true }))}
      />
      {filter.active ? (
        <ClearFilterButton />
      ) : (
        !isAddMoveMode && <AddMoveButton openModal={openModal} />
      )}
    </FilterInputWrapper>
  );
};

const FilterInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  gap: 1rem;
  max-width: 1024px;
  justify-self: center;
  width: 100%;
  input {
    font-size: 24px;
    padding: 0.5rem 1rem;
    box-shadow: ${(p) => p.theme.shadow[2]};
    border: none;
    background: ${(p) => p.theme.mode.background[300]};
    border-radius: 5px;
    color: ${(p) => p.theme.mode.color[100]};
    width: inherit;
  }
`;

export default FilterInput;
