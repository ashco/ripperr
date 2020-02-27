import React from 'react';
import styled from 'styled-components';

import { MovementListContext } from '../../context';

import {
  ArchetypeListItem,
  ExerciseListItem,
  WorkoutListItem,
} from '../ListItems';

import { sortMovements } from '../../common/sortMovements';
import { createMovementColList } from '../../common/createMovementColList';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  IMovementState,
} from '../../common/types';
import { MovementType } from '../../common/enums';

export const MovementList: React.FC<{ moveList: Movement[] | null }> = ({
  moveList,
}) => {
  function renderListItem(move: Movement) {
    if (move.type === MovementType.Exercise) {
      return <ExerciseListItem key={move.id} exercise={move as Exercise} />;
    } else if (move.type === MovementType.Workout) {
      return <WorkoutListItem key={move.id} workout={move as Workout} />;
    } else {
      return null;
    }
  }

  return (
    <MovementListWrapper>
      {moveList ? (
        moveList.length === 0 ? (
          <div>Get out there and make something of yourself.</div>
        ) : (
          moveList.map((move) => renderListItem(move))
        )
      ) : (
        <div>Loading ...</div>
      )}
    </MovementListWrapper>
  );
};

const MovementListWrapper = styled.ul`
  /* margin: 0 1rem; */
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, 9rem);
  grid-auto-rows: 6rem;
  grid-auto-flow: row dense;
  /* grid-template-columns: repeat(auto-fit, 8rem); */
  /* grid-template-rows: repeat(auto-fill, 8rem); */
  justify-content: center;
  overflow-y: auto;
  padding: 1rem 1rem 0;
  /* grid-template-columns: repeat(auto-fill, 8rem);
  grid-template-rows: repeat(auto-fill, 8rem); */
  &:after {
    content: ' ';
    height: 1px;
    position: relative;
    bottom: 0;
  }
`;
