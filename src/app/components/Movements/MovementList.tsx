import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MovementsContext } from '../../context';

import {
  ArchetypeListItem,
  ExerciseListItem,
  WorkoutListItem,
} from '../ListItems';

import {
  IMovements,
  IArchetype,
  IExercise,
  IWorkout,
  IMovementState,
} from '../../common/types';
import { MovementType } from '../../common/enums';

function sortMovements(a: IMovements, b: IMovements): number {
  if (a.lastModified !== null && b.lastModified !== null) {
    const aTime = (a.lastModified as firebase.firestore.Timestamp)
      .toDate()
      .getTime();
    const bTime = (b.lastModified as firebase.firestore.Timestamp)
      .toDate()
      .getTime();

    return bTime - aTime;
  } else {
    return 0;
  }
}

function createMovementColList(colNum: number, moveList: IMovements[]) {
  // create sorted movement lists
  const movementColList: any[] = [];

  for (let i = 0; i < colNum; i += 1) {
    movementColList.push([]);
  }
  moveList.forEach((move, i) => {
    const index = i % colNum;
    movementColList[index].push(move);
  });

  return movementColList;
}

const MovementList: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const [width, setWidth] = useState(0);
  const [columnNum, setColumnNum] = useState(0);

  function updateColumnNum(): void {
    const remPixels = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );

    let colWidth = 0;
    if (listRef && listRef.current) {
      colWidth = listRef.current.offsetWidth;
    }

    const listItemWidth = 16 * remPixels;
    const colNum = Math.floor(colWidth / listItemWidth);

    setColumnNum(colNum);
  }

  useEffect(() => {
    window.addEventListener('resize', updateColumnNum);
    return () => {
      window.removeEventListener('resize', updateColumnNum);
    };
  }, []);

  const movements = useContext(MovementsContext);

  const movementList = [
    ...movements.archetypes,
    ...movements.exercises,
    ...movements.workouts,
  ].sort((a, b) => sortMovements(a, b));

  const movementColList = createMovementColList(columnNum, movementList);

  function renderListItem(move: IMovements) {
    if (move.type === MovementType.Archetype) {
      return <ArchetypeListItem key={move.id} archetype={move as IArchetype} />;
    } else if (move.type === MovementType.Exercise) {
      return <ExerciseListItem key={move.id} exercise={move as IExercise} />;
    } else if (move.type === MovementType.Workout) {
      return <WorkoutListItem key={move.id} workout={move as IWorkout} />;
    } else {
      return null;
    }
  }

  return (
    <MovementListWrapper ref={listRef}>
      {movements.loading ? (
        <div>Loading ...</div>
      ) : movementList.length === 0 ? (
        <div>Get out there and make something of yourself.</div>
      ) : (
        movementColList.map((col, i) => (
          <div key={i}>
            {col.map((move: IMovements) => renderListItem(move))}
          </div>
        ))
      )}
    </MovementListWrapper>
  );
};

const MovementListWrapper = styled.ul`
  display: flex;
  justify-content: center;
  /* margin-top: ${(p) => p.theme.space[2]}; */
  /* display: flex;
  flex-direction: column; */
  /* flex-wrap: wrap; */
  /* align-content: center; */
  /* height: 100%; */
  /* overflow-y: auto;
  li {
    &:nth-child(3n+1) { order: 1; }
    &:nth-child(3n+2) { order: 2; }
    &:nth-child(3n)   { order: 3; }
  }
  &::before,
  &::after {
    content: "";
    flex-basis: 100%;
    width: 0;
    order: 2;
  } */
`;

export default MovementList;
