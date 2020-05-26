import React from 'react';
import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';
import { FieldError } from 'react-hook-form';
import styled, { ThemeContext } from 'styled-components';
import {
  SortableHandle,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';

import ColorBarWrapper from 'components/ColorBarWrapper';
import Icon from 'components/Icon';
import FieldWrapper from 'components/FieldWrapper';

import { MoveListItemWrapper, MoveListWrapper } from './style';

import arrayMove from 'utils/array-move';

import { MoveRef, WorkoutMode1, WorkoutMode2, Exercises } from 'types';
// import { IMoveRefs } from 'types/types';

const DragHandleWrapper = styled.div`
  svg path {
    fill: ${(p) => p.theme.mode.color[200]};
  }
  &:hover {
    svg path {
      fill: ${(p) => p.theme.mode.color[100]};
    }
  }
`;

const MoveItem = SortableElement(
  ({
    move,
    index,
    otherIndex,
    isDisabled,
    mode,
    register,
    exercises,
  }: {
    move: MoveRef;
    index: number;
    otherIndex: number; // Added second index because regular index variable is coming in undefined. Might be because SortableElement needs index as prop, and then doesn't pass it down.
    isDisabled: boolean;
    mode: [WorkoutMode1, WorkoutMode2];
    register: any;
    exercises: Exercises;
  }) => {
    // const moveDispatch = useMoveDispatch();

    // const { modalMode } = useSelector((state) => state.ui);

    function handleDelete(e: any) {
      e.preventDefault();

      // moveDispatch({
      //   type: 'MOVE_DELETE_MOVE',
      //   index: otherIndex,
      // });
    }

    const DragHandle = SortableHandle(() => (
      <DragHandleWrapper className="drag-icon">
        {!isDisabled && <Icon name="grip-lines" />}
      </DragHandleWrapper>
    ));

    return (
      <MoveListItemWrapper isDisabled={isDisabled}>
        <ColorBarWrapper color="purple">
          <div className="list-item-container">
            <DragHandle />
            <p className="name">{exercises.byId[move.id].name}</p>
            <div className="number-values">
              {mode[1] === 'REPS' && (
                <label>
                  <span>Reps</span>
                  <input
                    type="number"
                    // placeholder="Reps"
                    name={`movements[${otherIndex}][reps]`}
                    min="0"
                    max="999"
                    ref={register}
                    // value={move.reps}
                    // onChange={
                    //   (e) => console.log('hie')
                    //   // moveDispatch({
                    //   //   type: 'MOVE_CHANGE_MOVE_EX_REPS',
                    //   //   value: e.currentTarget.value,
                    //   //   index: otherIndex,
                    //   // })
                    // }
                    disabled={isDisabled}
                  />
                </label>
              )}
              {mode[0] === 'SETS' && (
                <label>
                  <span>Sets</span>
                  <input
                    type="number"
                    // placeholder="Sets"
                    name={`movements[${otherIndex}][sets]`}
                    min="0"
                    max="999"
                    ref={register}
                    // value={move.sets}
                    // onChange={
                    //   (e) => console.log('weee')
                    //   // moveDispatch({
                    //   //   type: 'MOVE_CHANGE_MOVE_EX_SETS',
                    //   //   value: e.currentTarget.value,
                    //   //   index: otherIndex,
                    //   // })
                    // }
                    disabled={isDisabled}
                  />
                </label>
              )}
              {/* {mode === WorkoutMode.Timed && (
                <label>
                  <span>Duration</span>
                  <input
                    type="number"
                    placeholder="Sec"
                    min="0"
                    max="999"
                    value={move.duration}
                    onChange={
                      (e) => console.log('oo')
                      // moveDispatch({
                      //   type: 'MOVE_CHANGE_MOVE_EX_DURATION',
                      //   value: e.currentTarget.value,
                      //   index: otherIndex,
                      // })
                    }
                    disabled={isDisabled}
                  />
                </label>
              )} */}
            </div>
            {!isDisabled && (
              <button className="delete-btn" onClick={handleDelete}>
                ✕
              </button>
            )}
          </div>
        </ColorBarWrapper>
      </MoveListItemWrapper>
    );
  },
);

const MoveList = SortableContainer(
  ({
    moves,
    isDisabled,
    mode,
    register,
    exercises,
    error,
  }: {
    moves: MoveRef[];
    register: any;
    mode: [WorkoutMode1, WorkoutMode2];
    isDisabled: boolean;
    exercises: Exercises;
    error?: FieldError;
  }) => {
    return (
      <FieldWrapper>
        <label role={error?.message && 'alert'}>
          {error?.message || 'Movements:'}
        </label>
        <MoveListWrapper>
          {moves.map((move, i) => {
            return (
              <MoveItem
                register={register}
                key={`item-${i}`}
                move={move}
                mode={mode}
                index={i}
                otherIndex={i}
                isDisabled={isDisabled}
                exercises={exercises}
              />
            );
          })}
        </MoveListWrapper>
      </FieldWrapper>
    );
  },
);

const MoveSortableComponent: React.FC<{
  moves: MoveRef[];
  mode: [WorkoutMode1, WorkoutMode2];
  // formValue: any;
  isDisabled: boolean;
  register: any;
  exercises: Exercises;
  // }> = ({ moves, isDisabled, mode }) => {
}> = ({ isDisabled, moves = [], mode = [null, null], register, exercises }) => {
  // const moveDispatch = useMoveDispatch();

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }): void {
    const sortedArr = arrayMove(moves, oldIndex, newIndex);

    // moveDispatch({ type: 'MOVE_SORT_MOVE', value: sortedArr });
  }

  return (
    <MoveList
      register={register}
      moves={moves}
      isDisabled={isDisabled}
      mode={mode}
      useDragHandle
      onSortEnd={onSortEnd}
      lockAxis="y"
      lockToContainerEdges={true}
      exercises={exercises}
    />
  );
};

export default MoveSortableComponent;
