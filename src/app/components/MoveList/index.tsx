import React from 'react';
import { useSelector } from 'store';
import MoveListWrapper from './style';

import Loading from 'components/Loading';
import MoveListItem from '../MoveListItem';

const MoveList: React.FC = () => {
  const { isAddMoveMode } = useSelector((state) => state.ui);
  const moves = useSelector((state) => state.moves);

  let moveList = null;
  if (moves.workouts && moves.exercises) {
    moveList = isAddMoveMode
      ? [...Object.keys(moves.exercises.byId)]
      : [
          ...Object.keys(moves.workouts.byId),
          ...Object.keys(moves.exercises.byId),
        ];
  }

  return (
    <MoveListWrapper>
      {moveList ? (
        moveList.length > 0 ? (
          <ul>
            {moveList.map((id) => (
              <MoveListItem key={id} id={id} isAddMoveMode={isAddMoveMode} />
            ))}
          </ul>
        ) : (
          <p className="message">No moves have been created.</p>
        )
      ) : (
        <Loading />
      )}
    </MoveListWrapper>
  );
};

export default MoveList;
