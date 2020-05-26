import React from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

import FieldWrapper from 'components/FieldWrapper';

import { WorkoutMode1, WorkoutMode2 } from 'types';

const ModeField: React.FC<{
  formValue: any;
  isDisabled: boolean;
  register: any;
  error?: FieldError;
}> = ({ isDisabled, error, register, formValue }) => {
  // const moveDispatch = useMoveDispatch();

  return (
    <ModeFieldWrapper
      disabled={isDisabled}
      modeHidden={formValue['mode[0]'] === ''}
    >
      <label htmlFor="mode" role={error?.message && 'alert'}>
        {error?.message || 'Mode:'}
      </label>
      <div className="row">
        <label>
          <input
            type="radio"
            name="mode[0]"
            ref={register}
            value="REPS"
            disabled={isDisabled}
          />
          <span>Reps</span>
        </label>
        <label>
          <input
            type="radio"
            name="mode[0]"
            ref={register}
            value="CIRCUIT"
            disabled={isDisabled}
          />
          <span>Circuit</span>
        </label>
      </div>
      <div className="row row-2">
        <label>
          <input
            type="radio"
            name="mode[1]"
            ref={register}
            value="SETS"
            disabled={isDisabled}
          />
          <span>Sets</span>
        </label>
        <label>
          <input
            type="radio"
            name="mode[1]"
            ref={register}
            value="TIMED"
            disabled={isDisabled}
          />
          <span>Timed</span>
        </label>
      </div>
    </ModeFieldWrapper>
  );
};

const ModeFieldWrapper = styled(FieldWrapper)<{ modeHidden: boolean }>`
  grid-template-rows: auto 1fr;
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    height: 2rem;
    label {
      border: 2px solid ${(p) =>
        p.disabled ? 'gray' : p.theme.mode.color[100]};
      cursor: ${(p) => (p.disabled ? 'auto' : 'pointer')};
      display: grid;
    }
    label input {
      display: none;
    }
    label span {
      padding: 0.5rem;
      font-size: 16px;
      width: 100%;
      text-align: center;
    }
    input:checked + span {
      background-color: ${(p) =>
        p.disabled ? 'gray' : p.theme.mode.color[100]};
      color: ${(p) => p.theme.mode.background[300]};
    }
  }
  .row-2 {
    /* display: ${(p) => (p.modeHidden ? 'none' : 'auto')}; */
  }
`;

export default ModeField;
