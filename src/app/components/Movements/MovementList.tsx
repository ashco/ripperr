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

const MovementList: React.FC = () => {
  // const [scrollState, setScrollState] = useState({
  //   isScrolling: false,
  //   scrollLeft: 0,
  //   clientX: 0,
  // });

  const listRef = useRef<HTMLUListElement>(null);

  const [width, setWidth] = useState(0);

  // useEffect(() => {
  // setWidth(listRef.current.offsetWidth);
  // });

  function calcColumns() {
    let elementWidth = 0;
    if (listRef && listRef.current) {
      elementWidth = listRef.current.offsetWidth;
    }
    const remPixels = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const listItemWidth = 16 * remPixels;
    const columnNum = Math.floor(elementWidth / listItemWidth);

    return columnNum;
  }
  // const listRef = useRef<HTMLUListElement>(null);

  // function onMouseDown(e: any) {
  //   // const { scrollLeft, scrollTop } = listRef;
  //   console.log('mouse down');

  //   setScrollState({
  //     isScrolling: true,
  //     scrollLeft: 0,
  //     clientX: e.clientX,
  //   });
  // }

  // function onMouseMove(e: any) {
  //   if (scrollState.isScrolling) {
  //     const {clientX, scrollLeft} = scrollState;

  //     // console.log(scrollState);
  //     // console.log(e.clientX);

  //     // const x = scrollLeft - clientX + e.clientX;
  //     // console.log(x);

  //     // setScrollState({ ...scrollState, scrollLeft: x })
  //     if (listRef && listRef.current) {

  //       // console.log(scrollLeft);
  //       // console.log(clientX);
  //       // console.log(e.clientX);
  //       console.log(e.clientX - clientX);
  //       listRef.current.scrollLeft = scrollLeft - e.clientX - clientX;
  //       console.log(listRef.current.scrollLeft)
  //     }
  //     // console.log(scrollState);
  //   }
  //   // const {clientX, scrollLeft} = this.state;
  //   // this._scroller.scrollLeft = scrollLeft - clientX + event.clientX;
  // }

  // function onMouseUp() {
  //   console.log('mouse up');

  //   setScrollState({
  //     isScrolling: false,
  //     scrollLeft: 0,
  //     clientX: 0,
  //   });
  // }

  // useEffect(() => {
  //   window.addEventListener('mouseup', onMouseUp);
  //   window.addEventListener('mousemove', onMouseMove);

  //   return () => {
  //     window.removeEventListener('mouseup', onMouseUp)
  //     window.removeEventListener('mousemove', onMouseMove)
  //   };
  // }, [scrollState.isScrolling]);

  const movements = useContext(MovementsContext);

  const movementList = [
    ...movements.archetypes,
    ...movements.exercises,
    ...movements.workouts,
  ].sort((a, b) => sortMovements(a, b));

  // create sorted movement lists
  const movementColumnList: any[] = [];
  const columnNum = calcColumns();
  for (let i = 0; i < columnNum; i += 1) {
    movementColumnList.push([]);
  }
  movementList.forEach((move, i) => {
    const index = i % columnNum;
    movementColumnList[index].push(move);
  });

  console.log(movementColumnList);

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

  calcColumns();

  return (
    <MovementListWrapper
      ref={listRef}
      // onMouseDown={onMouseDown}
      // onScroll={onMouseMove}
    >
      {movements.loading ? (
        <div>Loading ...</div>
      ) : movementList.length === 0 ? (
        <div>Get out there and make something of yourself.</div>
      ) : (
        <>
          {movementColumnList.map((column, i) => (
            <div key={i}>
              {column.map((move: IMovements) => renderListItem(move))}
            </div>
          ))}
          {/* <div>
            {movementList.map(
              (move: IMovements, i: number) =>
                i % 2 === 0 && renderListItem(move),
            )}
          </div>
          <div>
            {movementList.map(
              (move: IMovements, i: number) =>
                i % 2 === 1 && renderListItem(move),
            )}
          </div> */}
          {/* <div>
            {movementList.map(
              (move: IMovements, i: number) =>
                i % 3 === 2 && renderListItem(move),
            )}
          </div> */}
        </>
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
