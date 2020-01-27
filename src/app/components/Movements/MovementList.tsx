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
    scrollTop: 0,
    clientX: 0,
    clientY: 0,
  });
  const listRef = useRef<HTMLUListElement>(null);

  // function onMouseMove(event: any) {
  //   // const { scrollLeft, scrollTop, clientX, clientY } = scrollState;

  //   console.log(event.clientX);
  //   console.log(event.clientY);
  //   // this._scroller.scrollLeft = scrollLeft - clientX + event.clientX;
  //   // this._scroller.scrollTop = scrollTop - clientY + event.clientY;
  // }

  function onMouseDown(e: any) {
    // const { scrollLeft, scrollTop } = listRef;

    setScrollState({
      isScrolling: true,
      scrollLeft: 0,
      scrollTop: 0,
      clientX: e.clientX,
      clientY: e.clientY,
    });
  }

  function onMouseMove(e: any) {
    console.log(e);
    // const {clientX, scrollLeft, scrollTop, clientY} = this.state;
    // this._scroller.scrollLeft = scrollLeft - clientX + event.clientX;
    // this._scroller.scrollTop = scrollTop - clientY + event.clientY;
  }

  function onMouseUp() {
    console.log('mouses up');

    setScrollState({
      isScrolling: false,
      scrollLeft: 0,
      scrollTop: 0,
      clientX: 0,
      clientY: 0,
    });
  }

  function toggleScrolling(isEnabled: boolean) {
    console.log(isEnabled);
    if (isEnabled) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  }

  useEffect(() => {
    toggleScrolling(scrollState.isScrolling);
  }, [scrollState.isScrolling]);

  // function handleMouseDown(e: any) {
  //   console.log(e.clientX);
  //   const { clientX, scrollLeft, scrollTop, clientY } = scrollState;
  //   console.log(scrollLeft - clientX + e.clientX);
  //   if (listRef && listRef.current) {
  //     console.log(listRef.current.scrollLeft);
  //   }
  //   // listRef.scrollLeft = scrollLeft - clientX + e.clientX;
  //   // listRef.scrollTop = scrollTop - clientY + e.clientY;
  // }

  // function onScroll(event: any) {
  // }

  // function attachScroller(scroller: any) {
  //   this._scroller = ReactDOM.findDOMNode(scroller);
  // }

  // function toggleScrolling(isEnable: boolean) {
  //   if (isEnable) {
  //     window.addEventListener('mousemove', onMouseMove);
  //     window.addEventListener('mouseup', onMouseUp);
  //   } else {
  //     window.removeEventListener('mousemove', onMouseMove);
  //   }
  // }

  // useEffect(() => {}, [scrollState]);

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
      ref={listRef}
      onMouseDown={onMouseDown}
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
