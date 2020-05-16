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
import { useMoveDispatch } from 'context/MoveContext';
import Icon from 'icons';

import { MovementListItemWrapper, MovementListWrapper } from './style';

import arrayMove from 'utils/array-move';
import { IMovementRefs } from 'types/types';
import { WorkoutMode } from 'types/enums';

const MovementItem = SortableElement(
  ({
    movement,
    index,
    otherIndex,
    isDisabled,
    mode,
  }: {
    movement: IMovementRefs;
    index: number;
    otherIndex: number; // Added second index because regular index variable is coming in undefined. Might be because SortableElement needs index as prop, and then doesn't pass it down.
    isDisabled: boolean;
    mode?: WorkoutMode;
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
      <MovementListItemWrapper isDisabled={isDisabled}>
        <ColorBarWrapper color="purple">
          <div className="list-item-container">
            <DragHandle />
            <p className="name">{movement.name}</p>
            <div className="number-values">
              {mode === WorkoutMode.Reps && (
                <>
                  <label>
                    <span>Reps</span>
                    <input
                      type="number"
                      placeholder="Reps"
                      min="0"
                      max="999"
                      value={movement.reps}
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
                      value={movement.sets}
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
                    value={movement.duration}
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
              )}
            </div>
            {modalMode === 'EDIT' && (
              <button className="delete-btn" onClick={handleDelete}>
                ✕
              </button>
            )}
          </div>
        </ColorBarWrapper>
      </MovementListItemWrapper>
    );
  },
);

const MovementList = SortableContainer(
  ({
    movements,
    isDisabled,
    mode,
  }: {
    movements: IMovementRefs[];
    mode?: WorkoutMode;
    isDisabled: boolean;
  }) => {
    return (
      <MovementListWrapper>
        {movements.map((move, i) => {
          return (
            <MovementItem
              key={`item-${i}`}
              movement={move}
              mode={mode}
              index={i}
              otherIndex={i}
              isDisabled={isDisabled}
            />
          );
        })}
      </MovementListWrapper>
    );
  },
);

const MovementSortableComponent: React.FC<{
  movements: IMovementRefs[];
  mode?: WorkoutMode;
  isDisabled: boolean;
}> = ({ movements, isDisabled, mode }) => {
  // const moveDispatch = useMoveDispatch();

  function onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }): void {
    const sortedArr = arrayMove(movements, oldIndex, newIndex);

    // moveDispatch({ type: 'MOVE_SORT_MOVE', value: sortedArr });
  }

  return (
    <MovementList
      movements={movements}
      isDisabled={isDisabled}
      mode={mode}
      useDragHandle
      onSortEnd={onSortEnd}
      lockAxis="y"
      lockToContainerEdges={true}
    />
  );
};

export default MovementSortableComponent;
