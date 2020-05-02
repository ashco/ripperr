import React from 'react';
import styled from 'styled-components';

import { useMoveDispatch } from '../../../context/MoveContext';

import { WorkoutMode } from '../../../types/enums';

const ModeField: React.FC<{ value: WorkoutMode; disabled: boolean }> = ({
  value,
  disabled,
}) => {
  const moveDispatch = useMoveDispatch();

  return (
    <ModeFieldWrapper disabled={disabled}>
      <label>
        <input
          type="radio"
          name="mode"
          id="mode-reps"
          checked={value === 'REPS'}
          value="REPS"
          onChange={(e) =>
            moveDispatch({
              type: 'MOVE_CHANGE_MODE',
              value: e.currentTarget.value,
            })
          }
          disabled={disabled}
        />
        <span>Reps</span>
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          id="mode-timed"
          checked={value === 'TIMED'}
          value="TIMED"
          onChange={(e) =>
            moveDispatch({
              type: 'MOVE_CHANGE_MODE',
              value: e.currentTarget.value,
            })
          }
          disabled={disabled}
        />
        <span>Timed</span>
      </label>
    </ModeFieldWrapper>
  );
};

const ModeFieldWrapper = styled.div<{ disabled: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin: 0 auto;
  gap: 0.5rem;
  label {
    border: 2px solid
      ${(props) =>
        // props.disabled
        // ? props.theme.mode.color[200]
        props.theme.mode.color[100]};
    cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  }
  label input {
    display: none;
  }
  label span {
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
  }
  input:checked + span {
    background-color: ${(props) => props.theme.mode.color[100]};
    color: ${(props) => props.theme.mode.background[300]};
  }
`;

export default ModeField;
