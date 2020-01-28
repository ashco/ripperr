import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { MovementsContext } from '../../context';

import { ExerciseListItem, WorkoutListItem } from '../ListItems';

import { IWorkout, IExercise, IMovementState } from '../../common/types';
import { MovementType } from '../../common/enums';

function sortMovements(
  a: IExercise | IWorkout,
  b: IExercise | IWorkout,
): number {
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
  const [scrollState, setScrollState] = useState({
    isScrolling: false,
    scrollLeft: 0,
    clientX: 0,
  });

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

  const movementList = [...movements.exercises, ...movements.workouts];
  movementList.sort((a, b) => sortMovements(a, b));

  function renderListItem(move: IWorkout | IExercise) {
    if (move.type === MovementType.Exercise) {
      return <ExerciseListItem key={move.id} exercise={move as IExercise} />;
    } else if (move.type === MovementType.Workout) {
      return <WorkoutListItem key={move.id} workout={move as IWorkout} />;
    } else {
      return null;
    }
  }

  return (
    <MovementListWrapper
      // ref={listRef}
      // onMouseDown={onMouseDown}
      // onScroll={onMouseMove}
    >
      {movements.loading ? (
        <div>Loading ...</div>
      ) : movementList.length === 0 ? (
        <div>Get out there and make something of yourself.</div>
      ) : (
        movementList.map((move: IWorkout | IExercise) => renderListItem(move))
      )}
    </MovementListWrapper>
  );
};

const MovementListWrapper = styled.ul`
  /* margin-top: ${(p) => p.theme.space[2]}; */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
  overflow-x: auto;
`;

export default MovementList;
