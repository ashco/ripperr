import React from 'react';
import { useSelector } from 'store';

import ArchetypeListWrapper from './style';

import MoveListItem from 'components/MoveListItem';
import { FilterState } from 'store/filter/types';

const ArchetypeList: React.FC<{
  filter: FilterState;
}> = ({ filter }) => {
  const { isAddMoveMode } = useSelector((state) => state.ui);
  const moves = useSelector((state) => state.moves);
  const { tags } = moves;

  return (
    <ArchetypeListWrapper>
      {Object.keys(tags.byId).length === 0 ? (
        <div>No archetypes yet!</div>
      ) : (
        Object.keys(tags.byId).map((id) => {
          return (
            <MoveListItem
              filter={filter}
              key={id}
              id={id}
              isAddMoveMode={isAddMoveMode}
              moves={moves}
            />
          );
        })
      )}

      {/* {archetypeList ? (
        archetypeList.length === 0 ? (
          <div>No archetypes yet!</div>
        ) : (
          archetypeList.map((arch) => {
            return <MoveListItem key={arch.id} movement={arch} />;
          })
        )
      ) : (
        <div>Loading ...</div>
      )} */}
    </ArchetypeListWrapper>
  );
};

export default ArchetypeList;
