import React from 'react';
import styled from 'styled-components';

import { useModalDispatch } from '../../context/ModalContext';
import { useFilterState, useFilterDispatch } from '../../context/FilterContext';

import { AddMovementButton } from '../Buttons';

const FilterBar: React.FC<{}> = () => {
  const filterState = useFilterState();
  const filterDispatch = useFilterDispatch();
  const modalDispatch = useModalDispatch();

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
      <AddMovementButton openModal={openModal} />
    </FilterBarWrapper>
  );
};

const FilterBarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  gap: 1rem;
  /* margin: 0 1rem 1rem; */
  input {
    font-size: 24px;
    padding: 0.5rem 1rem;
    box-shadow: ${(props) => props.theme.shadow[2]};
    border: none;
    border-radius: 5px;
  }
`;

export default FilterBar;
