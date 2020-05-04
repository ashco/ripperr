import React from 'react';
import styled from 'styled-components';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';

import { useMoveDispatch } from '@/context/MoveContext';

import ColorBarWrapper from '@/components/ColorBarWrapper';

import MovementListItemWrapper from './style';
import GripIcon from '@/icons/GripLines';

import { IMovementRefs } from '@/types/types';
import { MovementType, WorkoutMode, ModalMode } from '@/types/enums';

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

    const DragHandle = SortableHandle(() => (
      <div className="drag-icon">
        {modalMode === ModalMode.Edit && <GripIcon />}
      </div>
    ));

    return (
      <MovementListItemWrapper disabled={disabled}>
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

export default MovementListItem;
