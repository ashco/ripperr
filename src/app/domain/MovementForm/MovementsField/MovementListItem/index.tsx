import React from 'react';
import styled from 'styled-components';

import { useMoveDispatch } from '@/context/MoveContext';

import ColorBarWrapper from '@/components/ColorBarWrapper';

import MovementListItemWrapper from './style';

import { IMovementRefs } from '@/types/types';
import { MovementType, WorkoutMode, ModalMode } from '@/types/enums';

const MovementListItem: React.FC<{
  movement: IMovementRefs;
  index: number;
  disabled: boolean;
  mode: WorkoutMode;
  modalMode: ModalMode;
}> = ({ movement, index, disabled, mode, modalMode }) => {
  const moveDispatch = useMoveDispatch();

  function handleDelete(e: any) {
    e.preventDefault();

    moveDispatch({
      type: 'MOVE_DELETE_MOVE',
      index,
    });
  }

  return (
    <ColorBarWrapper color="purple">
      <MovementListItemWrapper disabled={disabled}>
        <div className="dragger">
          {modalMode === ModalMode.Edit && <button>*</button>}
        </div>
        <p className="name">{movement.name}</p>
        <div className="number-values">
          {mode === WorkoutMode.Reps && (
            <>
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
            </>
          )}
          {mode === WorkoutMode.Timed && (
            <input
              type="number"
              placeholder="Duration"
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
          )}
        </div>
        {modalMode === ModalMode.Edit && (
          <button className="delete-btn" onClick={handleDelete}>
            ✕
          </button>
        )}
      </MovementListItemWrapper>
    </ColorBarWrapper>
  );
};

export default MovementListItem;
