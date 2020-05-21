﻿import React from 'react';
import { useSelector } from 'store';
import MovementMenuWrapper from './style';

import Loading from 'components/Loading';
import MoveListItem from '../MoveListItem';

// TODO - RENAME TO MovementList
const MovementMenu: React.FC<{
  // moveList: Movement[] | null;
  filterActive: boolean;
}> = () => {
  const { isAddMoveMode } = useSelector((state) => state.ui);
  const filter = useSelector((state) => state.filter);
  const moves = useSelector((state) => state.moves);

  const moveList = [
    ...Object.keys(moves.workouts.byId),
    ...Object.keys(moves.exercises.byId),
  ];

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(moves.isLoading);
  }, [moves.isLoading]);

  return (
    <MovementMenuWrapper>
      {isLoading ? (
        <Loading />
      ) : moveList.length === 0 ? (
        <p className="message">No moves are available..</p>
      ) : (
        <ul>
          {moveList.map((id) => (
            <MoveListItem
              filter={filter}
              key={id}
              id={id}
              isAddMoveMode={isAddMoveMode}
              moves={moves}
            />
          ))}
        </ul>
      )}
    </MovementMenuWrapper>
    // <MovementMenuWrapper>
    //   {moveList === null ? (
    //     <Loading />
    //   ) : moveList.length === 0 ? (
    //     <p className="message">No moves are available..</p>
    //   ) : (
    //     <ul>{moveList.map((move) => renderListItem(move))}</ul>
    //   )}
    // </MovementMenuWrapper>
  );
};

export default MovementMenu;
