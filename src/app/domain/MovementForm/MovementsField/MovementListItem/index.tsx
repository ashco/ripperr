import React from 'react';
import styled from 'styled-components';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';

import { useMoveDispatch } from '@/context/MoveContext';

import ColorBarWrapper from '@/components/ColorBarWrapper';

import MovementListItemWrapper from './style';

import { IMovementRefs } from '@/types/types';
import { MovementType, WorkoutMode, ModalMode } from '@/types/enums';

const DragHandle = SortableHandle(() => <StyledDragHandle></StyledDragHandle>);

const MovementListItem = SortableElement(
  ({
    movement,
    index,
    disabled,
    mode,
    modalMode,
  }: {
    movement: IMovementRefs;
    index: number;
    disabled: boolean;
    mode: WorkoutMode;
    modalMode: ModalMode;
  }) => {
    const moveDispatch = useMoveDispatch();

    function handleDelete(e: any) {
      e.preventDefault();

      moveDispatch({
        type: 'MOVE_DELETE_MOVE',
        index,
      });
    }

    return (
      <MovementListItemWrapper disabled={disabled}>
        <ColorBarWrapper color="purple">
          <div className="list-item-container">
            <div className="dragger">
              {modalMode === ModalMode.Edit && <DragHandle />}
            </div>
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
                      onChange={(e) =>
                        moveDispatch({
                          type: 'MOVE_CHANGE_MOVE_EX_REPS',
                          value: e.currentTarget.value,
                          index,
                        })
                      }
                      disabled={disabled}
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
                      onChange={(e) =>
                        moveDispatch({
                          type: 'MOVE_CHANGE_MOVE_EX_SETS',
                          value: e.currentTarget.value,
                          index,
                        })
                      }
                      disabled={disabled}
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
                    onChange={(e) =>
                      moveDispatch({
                        type: 'MOVE_CHANGE_MOVE_EX_DURATION',
                        value: e.currentTarget.value,
                        index,
                      })
                    }
                    disabled={disabled}
                  />
                </label>
              )}
            </div>
            {modalMode === ModalMode.Edit && (
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

const StyledDragHandle = styled.div`
  position: relative;
  top: 1px;
  display: block;
  width: 18px;
  height: 11px;
  opacity: 0.25;
  margin-right: 20px;
  cursor: row-resize;
  background: linear-gradient(
    180deg,
    hsl(0, 0%, 0%),
    hsl(0, 0%, 0%) 20%,
    hsl(0, 0%, 100%) 0,
    hsl(0, 0%, 100%) 40%,
    hsl(0, 0%, 0%) 0,
    hsl(0, 0%, 0%) 60%,
    hsl(0, 0%, 100%) 0,
    hsl(0, 0%, 100%) 80%,
    hsl(0, 0%, 0%) 0,
    hsl(0, 0%, 0%)
  );
`;

export default MovementListItem;
