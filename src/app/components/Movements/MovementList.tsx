import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MovementsContext } from '../../context';

import {
  ArchetypeListItem,
  ExerciseListItem,
  WorkoutListItem,
} from '../ListItems';

import { sortMovements } from '../../common/sortMovements';
import { createMovementColList } from '../../common/createMovementColList';

import {
  IMovements,
  IArchetype,
  IExercise,
  IWorkout,
  IMovementState,
} from '../../common/types';
import { MovementType } from '../../common/enums';

export const MovementList: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const [width, setWidth] = useState(0);
  const [columnNum, setColumnNum] = useState(0);

  // function updateColumnNum(): void {
  //   const remPixels = parseFloat(
  //     getComputedStyle(document.documentElement).fontSize,
  //   );

  //   let colWidth = 0;
  //   if (listRef && listRef.current) {
  //     colWidth = listRef.current.offsetWidth;
  //   }

  //   const listItemWidth = 16 * remPixels;
  //   let colNum = Math.floor(colWidth / listItemWidth);

  //   if (colNum < 1) colNum = 1;

  //   setColumnNum(colNum);
  // }

  // useEffect(() => {
  //   updateColumnNum();

  //   window.addEventListener('resize', updateColumnNum);
  //   return () => {
  //     window.removeEventListener('resize', updateColumnNum);
  //   };
  // }, []);

  const movements = useContext(MovementsContext);

  const movementList = [
    ...movements.exercises,
    ...movements.workouts,
  ].sort((a, b) => sortMovements(a, b));

  function renderListItem(move: IMovements) {
    if (move.type === MovementType.Exercise) {
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
        movementList.map((move) => renderListItem(move))
      )}
    </MovementListWrapper>
  );
};

const MovementListWrapper = styled.ul`
  margin: 0 1rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, 8rem);
  grid-template-rows: repeat(auto-fill, 8rem);
`;
