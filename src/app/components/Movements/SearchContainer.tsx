import React from 'react';
import styled from 'styled-components';

import { FilterBar } from './FilterBar';
import { ArchetypeRow } from './ArchetypeRow';

export const SearchContainer = () => {
  return (
    <SearchContainerWrapper>
      <FilterBar />
      {/* <ArchetypeRow /> */}
    </SearchContainerWrapper>
  );
};

const SearchContainerWrapper = styled.div`
  display: grid;
  /* grid-template-rows: auto 3rem; */
  gap: 1rem;
  /* background-color: ${(props) => props.theme.color.neutral[300]}; */
  /* box-shadow: ${(props) => props.theme.shadow[0]}; */
  padding-bottom: 0.5rem;
`;
