﻿import React from 'react';
import { useSelector } from 'store';

import TagListWrapper from './style';

import MoveListItem from 'components/MoveListItem';
import { FilterState } from 'store/filter';

const TagList: React.FC<{
  filter: FilterState;
}> = ({ filter }) => {
  const { isAddMoveMode } = useSelector((state) => state.ui);
  const moves = useSelector((state) => state.moves);

  let tagList = null;
  if (moves.tags) {
    tagList = [...Object.keys(moves.tags.byId)];
  }

  return (
    <TagListWrapper>
      {tagList ? (
        tagList.length > 0 ? (
          <ul>
            {tagList.map((id) => {
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
        ) : (
          <p className="message">Filter tags show up here when created.</p>
        )
      ) : (
        <p className="message">Loading tags...</p>
      )}
    </TagListWrapper>
  );
};

export default TagList;
