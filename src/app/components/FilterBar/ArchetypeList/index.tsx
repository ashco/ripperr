import React from 'react';

import ArchetypeListWrapper from './style';

import { MenuListItem } from '@/components/ListItems';

import { Archetype } from '@/types/types';

const ArchetypeList: React.FC<{
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

export default ArchetypeList;
