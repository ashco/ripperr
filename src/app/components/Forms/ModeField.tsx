import React from 'react';

import { Row } from './styles';

import {
  IHandleChange,
  IWorkoutFormValues,
  IWorkoutFormErrors,
} from '../../common/types';
import { WorkoutMode } from '../../common/enums';

const TimedModeConfigFields: React.FC<{
  form: IWorkoutFormValues;
  handleChange: (e: IHandleChange) => void;
}> = ({ form, handleChange }) => {
  return (
    <Row>
      <label>
        <input
          type="number"
          name="rounds"
          min="0"
          value={form.config.rounds}
          onChange={handleChange}
        />
        Rounds
      </label>
    </Row>
  );
};

const ModeField: React.FC<{
  form: IWorkoutFormValues;
  errors: IWorkoutFormErrors;
  handleChange: (e: IHandleChange) => void;
  handleChangeConfig: (e: IHandleChange) => void;
}> = ({ form, handleChange, handleChangeConfig }) => {
  return (
    <>
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
      <Row>
        {/* {form.mode === WorkoutMode.Reps && ()} */}
        {form.mode === WorkoutMode.Timed && (
          <TimedModeConfigFields
            form={form}
            handleChange={handleChangeConfig}
          />
        )}
      </Row>
    </>
  );
};

export default ModeField;
