import React from 'react';
import styled from 'styled-components';

import FilterBar from './FilterBar';
import { ArchetypeRow } from './ArchetypeRow';

export const SearchContainer = () => {
  return (
    <SearchContainerWrapper>
      <FilterBar />
    </SearchContainerWrapper>
  );
};

const SearchContainerWrapper = styled.div`
  display: grid;
  gap: 1rem;
  padding-bottom: 0.5rem;
`;
