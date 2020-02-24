﻿import React from 'react';
import styled from 'styled-components';

import { AddMovementButton } from '../Buttons';
import { useModalDispatch } from '../../context/ModalContext';

const FilterBar: React.FC<{
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setFilterMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ filter, setFilter, setFilterMode }) => {
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
        value={filter}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setFilter(e.target.value)
        }
        onFocus={() => setFilterMode(true)}
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