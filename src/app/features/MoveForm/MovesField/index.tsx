import React from 'react';
import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';

import styled, { ThemeContext } from 'styled-components';
import {
  SortableHandle,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';

import ColorBarWrapper from 'components/ColorBarWrapper';
import Icon from 'components/Icon';

import { MoveListItemWrapper, MoveListWrapper } from './style';

import arrayMove from 'utils/array-move';

import { MoveRef, WorkoutMode1, WorkoutMode2 } from 'types';
// import { IMoveRefs } from 'types/types';

const MoveItem = SortableElement(
  ({
    move,
    index,
    otherIndex,
    isDisabled,
  }: // mode,
  {
    move: MoveRef;
    index: number;
    otherIndex: number; // Added second index because regular index variable is coming in undefined. Might be because SortableElement needs index as prop, and then doesn't pass it down.
    isDisabled: boolean;
    mode?: [WorkoutMode1, WorkoutMode2];
  }) => {
    // const moveDispatch = useMoveDispatch();

    const { modalMode } = useSelector((state) => state.ui);

    function handleDelete(e: any) {
      e.preventDefault();

      // moveDispatch({
      //   type: 'MOVE_DELETE_MOVE',
      //   index: otherIndex,
      // });
    }

    const DragHandle = SortableHandle(() => (
      <div className="drag-icon">
        {modalMode === 'EDIT' && <Icon name="grip-lines" />}
      </div>
    ));

    return (
      <MoveListItemWrapper isDisabled={isDisabled}>
        <ColorBarWrapper color="purple">
          <div className="list-item-container">
            <DragHandle />
            <p className="name">{move.id}</p>
            <div className="number-values">
              {/* {mode === WorkoutMode.Reps && (
                <>
                  <label>
                    <span>Reps</span>
                    <input
                      type="number"
                      placeholder="Reps"
                      min="0"
                      max="999"
                      value={move.reps}
                      onChange={
                        (e) => console.log('hie')
                        // moveDispatch({
                        //   type: 'MOVE_CHANGE_MOVE_EX_REPS',
                        //   value: e.currentTarget.value,
                        //   index: otherIndex,
                        // })
                      }
                      disabled={isDisabled}
                    />
                  </label>
                  <label>
                    <span>Sets</span>
                    <input
                      type="number"
                      placeholder="Sets"
                      min="0"
                      max="999"
                      value={move.sets}
                      onChange={
                        (e) => console.log('weee')
                        // moveDispatch({
                        //   type: 'MOVE_CHANGE_MOVE_EX_SETS',
                        //   value: e.currentTarget.value,
                        //   index: otherIndex,
                        // })
                      }
                      disabled={isDisabled}
                    />
                  </label>
                </>
              )}
              {mode === WorkoutMode.Timed && (
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
            {modalMode === 'EDIT' && (
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
  }: {
    moves: MoveRef[];
    mode?: [WorkoutMode1, WorkoutMode2];
    isDisabled: boolean;
  }) => {
    return (
      <MoveListWrapper>
        {moves.map((move, i) => {
          return (
            // <div>{i}</div>
            <MoveItem
              key={`item-${i}`}
              move={move}
              mode={mode}
              index={i}
              otherIndex={i}
              isDisabled={isDisabled}
            />
          );
        })}
      </MoveListWrapper>
    );
  },
);

const MoveSortableComponent: React.FC<{
  moves: MoveRef[];
  mode?: [WorkoutMode1, WorkoutMode2];
  // formValue: any;
  isDisabled: boolean;
  // }> = ({ moves, isDisabled, mode }) => {
}> = ({ isDisabled, moves = [], mode = [null, null] }) => {
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

  console.log(mode);

  return (
    <MoveList
      moves={moves}
      isDisabled={isDisabled}
      mode={mode}
      useDragHandle
      onSortEnd={onSortEnd}
      lockAxis="y"
      lockToContainerEdges={true}
    />
  );
};

export default MoveSortableComponent;
