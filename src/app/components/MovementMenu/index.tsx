import React from 'react';
import styled from 'styled-components';

import MovementMenuWrapper from './style';

import Loading from '@/components/Loading';
import { MenuListItem } from '../ListItems';

import { Movement } from '../../types/types';
import { MovementType } from '../../types/enums';

const MovementMenu: React.FC<{
  moveList: Movement[] | null;
  filterActive: boolean;
}> = ({ moveList }) => {
  function renderListItem(move: Movement) {
    if (
      move.type === MovementType.Exercise ||
      move.type === MovementType.Workout
    ) {
      return <MenuListItem key={move.id} movement={move} />;
    } else {
      return null;
    }
  }

  return (
    <MovementMenuWrapper>
      {moveList === null ? (
        <Loading />
      ) : moveList.length === 0 ? (
        <p className="message">No moves are available..</p>
      ) : (
        <ul>{moveList.map((move) => renderListItem(move))}</ul>
      )}
    </MovementMenuWrapper>
  );
};

export default MovementMenu;
