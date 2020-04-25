import React from 'react';
import styled from 'styled-components';

import { useFilterState } from '../../context/FilterContext';

import { ArchetypeListItem } from '../ListItems';

import { Archetype } from '../../types/types';
import { MovementType } from '../../types/enums';

export const ArchetypeList: React.FC<{
  archetypeList: Archetype[] | null;
}> = ({ archetypeList }) => {
  return (
    <ArchetypeListWrapper>
      {archetypeList ? (
        archetypeList.length === 0 ? (
          <div>No archetypes yet!</div>
        ) : (
          archetypeList.map((arch) => {
            return <ArchetypeListItem key={arch.id} archetype={arch} />;
          })
        )
      ) : (
        <div>Loading ...</div>
      )}
    </ArchetypeListWrapper>
  );
};

const ArchetypeListWrapper = styled.ul`
  margin: 0 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(6rem, auto));
  grid-auto-rows: 3rem;
  grid-auto-flow: row dense;
  justify-content: center;
`;
