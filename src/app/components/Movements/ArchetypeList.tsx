import React from 'react';
import styled from 'styled-components';

import { useFilterState } from '../../context/FilterContext';

import { ArchetypeListItem } from '../ListItems';

import { Archetype } from '../../common/types';
import { MovementType } from '../../common/enums';

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
  grid-template-columns: repeat(auto-fit, 6rem);
  grid-auto-rows: 3rem;
  grid-auto-flow: row dense;
  /* grid-template-columns: repeat(auto-fit, 8rem); */
  /* grid-template-rows: repeat(auto-fill, 8rem); */
  justify-content: center;
  /* grid-template-columns: repeat(auto-fill, 8rem);
  grid-template-rows: repeat(auto-fill, 8rem); */
`;
