import React from 'react';
import { useDispatch, useSelector } from 'store';

import ArchetypeListWrapper from './style';

import MovementListItem from 'components/MovementListItem';
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
            <MovementListItem
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
