import React from 'react';
import { useSelector } from 'store';

import TagListWrapper from './style';

import MoveListItem from 'components/MoveListItem';
import { FilterState } from 'store/filter';

const TagList: React.FC<{
  filter: FilterState;
}> = ({ filter }) => {
  const { isAddMoveMode } = useSelector((state) => state.ui);
  const moves = useSelector((state) => state.moves);
  const { tags } = moves;

  return (
    <TagListWrapper>
      {Object.keys(tags.byId).length === 0 ? (
        <p className="message">Filter tags show up here when created.</p>
      ) : (
        <ul>
          {Object.keys(tags.byId).map((id) => {
            return (
              <MoveListItem
                filter={filter}
                key={id}
                id={id}
                isAddMoveMode={isAddMoveMode}
                moves={moves}
              />
            );
          })}
        </ul>
      )}

      {/* <div>Loading ...</div> */}
    </TagListWrapper>
  );
};

export default TagList;
