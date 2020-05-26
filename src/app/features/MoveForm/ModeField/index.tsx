import React from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

import FieldWrapper from 'components/FieldWrapper';

import { WorkoutMode1, WorkoutMode2 } from 'types';

const ModeField: React.FC<{
  isDisabled: boolean;
  register: any;
  error?: FieldError;
}> = ({ isDisabled, error, register }) => {
  return (
    <ModeFieldWrapper disabled={isDisabled}>
      <label htmlFor="mode" role={error?.message && 'alert'}>
        {error?.message || 'Mode:'}
      </label>
      <div className="row">
        <ButtonLabel disabled={isDisabled}>
          <input
            type="radio"
            name="mode[0]"
            ref={register}
            value="SETS"
            disabled={isDisabled}
          />
          <span>Sets</span>
        </ButtonLabel>
        <ButtonLabel disabled={isDisabled}>
          <input
            type="radio"
            name="mode[0]"
            ref={register}
            value="CIRCUIT"
            disabled={isDisabled}
          />
          <span>Circuit</span>
        </ButtonLabel>
      </div>
      <div className="row row-2">
        <ButtonLabel disabled={isDisabled}>
          <input
            type="radio"
            name="mode[1]"
            ref={register}
            value="REPS"
            disabled={isDisabled}
          />
          <span>Reps</span>
        </ButtonLabel>
        <ButtonLabel disabled={isDisabled}>
          <input
            type="radio"
            name="mode[1]"
            ref={register}
            value="TIMED"
            disabled={isDisabled}
          />
          <span>Timed</span>
        </ButtonLabel>
      </div>
    </ModeFieldWrapper>
  );
};

export const ButtonLabel = styled.label<{ disabled?: boolean }>`
  border: 2px solid ${(p) => (p.disabled ? 'gray' : p.theme.mode.color[100])};
  cursor: ${(p) => (p.disabled ? 'auto' : 'pointer')};
  display: grid;
  input {
    display: none;
  }
  span {
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: ${(p) => (p.disabled ? 'gray' : p.theme.mode.color[100])};
  }
  input:checked + span {
    background-color: ${(p) => (p.disabled ? 'gray' : p.theme.mode.color[100])};
    color: ${(p) => p.theme.mode.background[300]};
  }
`;

const ModeFieldWrapper = styled(FieldWrapper)`
  grid-template-rows: auto 1fr;
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    height: 2rem;
  }
  .row-2 {
    /* display: ${(p) => (p.modeHidden ? 'none' : 'auto')}; */
  }
`;

export default ModeField;
