import React from 'react';
import styled from 'styled-components';

import { MenuListItem } from '../ListItems';

import { Archetype } from '../../types/types';

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
            return <MenuListItem key={arch.id} movement={arch} />;
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
  grid-template-columns: repeat(auto-fill, 9rem);
  grid-auto-rows: 3rem;
  grid-auto-flow: row dense;
  justify-content: center;
`;
