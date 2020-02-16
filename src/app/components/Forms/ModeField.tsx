import React from 'react';
import styled from 'styled-components';

import { Row } from './styles';

import {
  IHandleChange,
  IWorkoutFormState,
  IWorkoutFormErrors,
} from '../../common/types';
import { WorkoutMode } from '../../common/enums';

const TimedModeConfigFields: React.FC<{
  form: IWorkoutFormState;
  handleChange: (e: IHandleChange) => void;
}> = ({ form, handleChange }) => {
  return (
    <Row>
      <label>
        <input
          type="number"
          name="rounds"
          min="0"
          max="999"
          value={form.config.rounds}
          onChange={handleChange}
        />
        Rounds
      </label>
    </Row>
  );
};

const ModeField: React.FC<{
  form: IWorkoutFormState;
  errors: IWorkoutFormErrors;
  handleChange: (e: IHandleChange) => void;
  handleChangeConfig: (e: IHandleChange) => void;
}> = ({ form, handleChange, handleChangeConfig }) => {
  return (
    <ModeFieldWrapper>
      <Row>
        <label>
          <input
            name="mode"
            type="radio"
            value={WorkoutMode.Reps}
            checked={form.mode === WorkoutMode.Reps}
            onChange={handleChange}
          />
          Reps
        </label>
        <label>
          <input
            name="mode"
            type="radio"
            value={WorkoutMode.Timed}
            checked={form.mode === WorkoutMode.Timed}
            onChange={handleChange}
          />
          Timed
        </label>
      </Row>
      {/* {form.mode === WorkoutMode.Reps && ()} */}
      {form.mode === WorkoutMode.Timed && (
        <TimedModeConfigFields form={form} handleChange={handleChangeConfig} />
      )}
    </ModeFieldWrapper>
  );
};

const ModeFieldWrapper = styled.div``;

export default ModeField;
