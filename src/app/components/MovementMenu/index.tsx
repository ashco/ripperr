import React from 'react';
import { useDispatch, useSelector } from 'store';
import MovementMenuWrapper from './style';

import Loading from 'components/Loading';
import MovementListItem from '../MovementListItem';

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

  // function renderListItem(id: string) {
  //   // if (
  //   //   move.type === MovementType.Exercise ||
  //   //   move.type === MovementType.Workout
  //   // ) {
  //   console.log(id);
  //   return ;
  //   // } else {
  //   //   return null;
  // }

  return (
    <MovementMenuWrapper>
      {moveList.length === 0 ? (
        <p className="message">No moves are available..</p>
      ) : (
        <ul>
          {moveList.map((id) => (
            <MovementListItem
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
