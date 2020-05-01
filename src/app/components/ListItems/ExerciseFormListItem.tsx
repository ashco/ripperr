﻿import React, { useEffect, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';
import { useModalDispatch } from '../../context/ModalContext';
import { useMoveDispatch } from '../../context/MoveContext';

import { ListItem } from './index';
import { ListItemMenuButton } from '../Buttons';
import ColorBarWrapper from '../Containers/ColorBarWrapper';

import { IMovementRefs } from '../../types/types';
import { MovementType, WorkoutMode, ModalMode } from '../../types/enums';

const ExerciseFormListItem: React.FC<{
  exercise: IMovementRefs;
  index: number;
  disabled: boolean;
  mode: WorkoutMode;
  modalMode: ModalMode;
}> = ({ exercise, index, disabled, mode, modalMode }) => {
  const themeContext = useContext(ThemeContext);
  const moveDispatch = useMoveDispatch();

  function handleDelete(e: any) {
    e.preventDefault();

    moveDispatch({
      type: 'MOVE_DELETE_MOVE',
      index,
    });
  }

  return (
    <ColorBarWrapper color={themeContext.color.purple[500]}>
      <ExerciseFormListItemWrapper>
        <p className="name">{exercise.name}</p>
        <div className="number-values">
          {mode === WorkoutMode.Reps && (
            <>
              <input
                type="number"
                placeholder="Reps"
                min="0"
                max="999"
                value={exercise.reps}
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
                value={exercise.sets}
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
              value={exercise.duration}
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
          <DeleteButton onClick={handleDelete}>✕</DeleteButton>
        )}
      </ExerciseFormListItemWrapper>
    </ColorBarWrapper>
  );
};

const ExerciseFormListItemWrapper = styled.div`
  border: 2px solid white;
  display: grid;
  grid-template-columns: 4fr 1fr 3rem;
  cursor: default;
  .number-values {
    display: flex;
    input[type='number'],
    input[type='number']:disabled {
      border: none;
      width: 5.5rem;
    }
  }
`;

const DeleteButton = styled.button`
  background: none;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.red[400]};
  }
`;

export default ExerciseFormListItem;
