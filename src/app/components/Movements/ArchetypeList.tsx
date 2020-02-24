import React from 'react';
import styled from 'styled-components';

import { useFilterState } from '../../context/FilterContext';

import { ArchetypeListItem } from '../ListItems';

import { Archetype } from '../../common/types';
import { MovementType } from '../../common/enums';

export const ArchetypeList: React.FC<{
  archetypeList: Archetype[] | null;
}> = ({ archetypeList }) => {
  const filterState = useFilterState();

  return (
    <ArchetypeListWrapper>
      {archetypeList ? (
        archetypeList.length === 0 ? (
          <div>No archetypes yet!</div>
        ) : (
          archetypeList.map((arch) => {
            // const isActive = filterState.archs.includes(arch.name);
            return (
              <ArchetypeListItem
                key={arch.id}
                archetype={arch}
                // className={isActive ? 'active' : ''}
              />
            );
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
  grid-template-columns: repeat(auto-fit, 4rem);
  grid-auto-rows: 4rem;
  grid-auto-flow: row dense;
  /* grid-template-columns: repeat(auto-fit, 8rem); */
  /* grid-template-rows: repeat(auto-fill, 8rem); */
  justify-content: center;
  /* grid-template-columns: repeat(auto-fill, 8rem);
  grid-template-rows: repeat(auto-fill, 8rem); */
`;
