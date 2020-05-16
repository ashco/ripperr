import React from 'react';

import MovementMenuWrapper from './style';

import Loading from 'components/Loading';
import MovementListItem from '../MovementListItem';

import { Movement } from '../../types/types';
import { MovementType } from '../../types/enums';

// TODO - RENAME TO MovementList
const MovementMenu: React.FC<{
  // moveList: Movement[] | null;
  moveList: string[];
  filterActive: boolean;
}> = ({ moveList }) => {
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
            <MovementListItem key={id} id={id} />
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
