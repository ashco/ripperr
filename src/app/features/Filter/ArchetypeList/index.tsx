import React from 'react';
import { useDispatch, useSelector } from 'store';

import ArchetypeListWrapper from './style';

import MovementListItem from 'components/MovementListItem';

import { Archetype } from 'types/types';

const ArchetypeList: React.FC<{
  // archetypeList: Archetype[] | null;
}> = () => {
  const { tags } = useSelector((state) => state.moves);

  return (
    <ArchetypeListWrapper>
      {Object.keys(tags.byId).length === 0 ? (
        <div>No archetypes yet!</div>
      ) : (
        Object.keys(tags.byId).map((id) => {
          console.log(tags.byId[id]);
          return <MovementListItem key={id} id={id} />;
        })
      )}

      {/* {archetypeList ? (
        archetypeList.length === 0 ? (
          <div>No archetypes yet!</div>
        ) : (
          archetypeList.map((arch) => {
            return <MovementListItem key={arch.id} movement={arch} />;
          })
        )
      ) : (
        <div>Loading ...</div>
      )} */}
    </ArchetypeListWrapper>
  );
};

export default ArchetypeList;
