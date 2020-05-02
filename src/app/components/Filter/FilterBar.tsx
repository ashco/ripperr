import React from 'react';
import styled from 'styled-components';

import { useModalDispatch } from '../../context/ModalContext';
import { useFilterState, useFilterDispatch } from '../../context/FilterContext';

import AddMovementButton from './Buttons/AddMovementButton';
import ClearFilterButton from './Buttons/ClearFilterButton';

const FilterBar: React.FC<{}> = () => {
  const filterState = useFilterState();
  const filterDispatch = useFilterDispatch();
  const modalDispatch = useModalDispatch();

  const filtering =
    filterState.value.length > 0 || filterState.archs.length > 0;

  function openModal(): void {
    modalDispatch({ type: 'MODAL_ADD_SELECT' });
  }

  return (
    <FilterBarWrapper>
      <input
        className="filter-bar"
        type="text"
        placeholder="Filter..."
        value={filterState.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          filterDispatch({
            type: 'FILTER_CHANGE_VALUE',
            value: e.target.value,
          })
        }
        onFocus={() => filterDispatch({ type: 'FILTER_MODE_ON' })}
      />
      {filtering ? (
        <ClearFilterButton />
      ) : (
        <AddMovementButton openModal={openModal} />
      )}
    </FilterBarWrapper>
  );
};

const FilterBarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  gap: 1rem;
  max-width: 1024px;
  justify-self: center;
  width: 100%;
  input {
    font-size: 24px;
    padding: 0.5rem 1rem;
    box-shadow: ${(props) => props.theme.shadow[2]};
    border: none;
    background: ${(props) => props.theme.mode.background[300]};
    border-radius: 5px;
    color: ${(props) => props.theme.mode.color[100]};
    width: inherit;
  }
`;

export default FilterBar;
