import React from 'react';
import styled from 'styled-components';

export const FilterBar = () => {
  return (
    <StyledFilterBar
      className="filter-bar"
      type="text"
      placeholder="Filter..."
    />
  );
};

const StyledFilterBar = styled.input`
  margin: 1rem 1rem 0;
  font-size: 24px;
  padding: 0.5rem;
`;
