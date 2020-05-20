import React from 'react';
import styled from 'styled-components';

import { WorkoutMode } from '../../../types/enums';

const ModeField: React.FC<{ value?: WorkoutMode; isDisabled: boolean }> = ({
  value,
  isDisabled,
}) => {
  // const moveDispatch = useMoveDispatch();

  return (
    <ModeFieldWrapper isDisabled={isDisabled}>
      <label>
        <input
          type="radio"
          name="mode"
          id="mode-reps"
          checked={value === 'REPS'}
          value="REPS"
          onChange={
            (e) => console.log('whoa')
            // moveDispatch({
            //   type: 'MOVE_CHANGE_MODE',
            //   value: e.currentTarget.value,
            // })
          }
          disabled={isDisabled}
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
          onChange={
            (e) => console.log('i')
            // moveDispatch({
            //   type: 'MOVE_CHANGE_MODE',
            //   value: e.currentTarget.value,
            // })
          }
          disabled={isDisabled}
        />
        <span>Timed</span>
      </label>
    </ModeFieldWrapper>
  );
};

const ModeFieldWrapper = styled.div<{ isDisabled: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin: 0 auto;
  gap: 0.5rem;
  label {
    border: 2px solid
      ${(props) =>
        // props.isDisabled
        // ? props.theme.mode.color[200]
        props.theme.mode.color[100]};
    cursor: ${(props) => (props.isDisabled ? 'auto' : 'pointer')};
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
