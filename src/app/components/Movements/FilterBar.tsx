import React from 'react';
import styled from 'styled-components';

export const FilterBar = () => {
  return (
    <FilterBarWrapper>
      <input className="filter-bar" type="text" placeholder="Filter..." />
    </FilterBarWrapper>
  );
};

const FilterBarWrapper = styled.div`
  /* width: 90%; */
  /* margin: auto; */
  padding: 1rem;
  .filter-bar {
    font-size: 24px;
    width: 100%;
    padding: 0.5rem;
  }
`;
