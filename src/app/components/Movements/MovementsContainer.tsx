import React from 'react';
import styled from 'styled-components';

import { MovementListContext } from '../../context';

import {
  ArchetypeListItem,
  ExerciseListItem,
  WorkoutListItem,
} from '../ListItems';

import { sortMovements } from '../../utils/sortMovements';
import { createMovementColList } from '../../utils/createMovementColList';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  IMovementState,
} from '../../types/types';
import { MovementType } from '../../types/enums';

export const MovementsContainer: React.FC<{
  moveList: Movement[] | null;
  filterActive: boolean;
  // loading: boolean;
}> = ({ moveList }) => {
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
    <MovementsContainerWrapper>
      {moveList === null ? (
        <Loading />
      ) : moveList.length === 0 ? (
        <NoMovementsMessage />
      ) : (
        <MovementListWrapper>
          {moveList.map((move) => renderListItem(move))}
        </MovementListWrapper>
      )}
    </MovementsContainerWrapper>
  );
};

const MovementsContainerWrapper = styled.div`
  padding: 1rem 1rem 0;
  overflow-y: auto;
  color: ${(props) => props.theme.mode.color[100]};
  display: grid;
`;

const NoMovementsMessage = () => (
  <NoMovementsMessageWrapper>
    No moves are available..
  </NoMovementsMessageWrapper>
);

const NoMovementsMessageWrapper = styled.p`
  justify-self: center;
`;

// const Loading = () => <p>Loading...</p>;
const Loading = () => (
  <LoadingWrapper>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </LoadingWrapper>
);

const LoadingWrapper = styled.div`
  justify-self: center;
  align-self: center;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${(props) => props.theme.mode.color[100]};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

const MovementListWrapper = styled.ul`
  padding-bottom: 1rem;
  display: grid;
  justify-content: center;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, 9rem);
  grid-auto-rows: 6rem;
  grid-auto-flow: row dense;
  &:after {
    content: ' ';
    height: 1px;
    position: relative;
    bottom: 0;
  }
`;
