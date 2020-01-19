import React from 'react';
import styled from 'styled-components';

import { Row } from './FormStyles';

import { IWorkoutFormValues } from '../../common/types';
import { WorkoutMode } from '../../common/enums';

const ModeField: React.FC<{
  form: IWorkoutFormValues;
  setForm: (form: IWorkoutFormValues) => void;
  handleChange: (e: { target: { name: string; value: any } }) => void;
}> = ({ form, setForm, handleChange }) => {
  function handleChangeMode(e: { target: { name: string; value: any } }) {
    handleChange(e);

    // Clear out config property + set to default for new mode
    const newMoves = form.movements.map((move) => ({
      id: move.id,
      config: {},
    }));
    const newForm = { ...form, movements: newMoves };
    // setForm(newForm);
  }

  return (
    <Row>
      <label>
        <input
          type="radio"
          name="mode"
          value={WorkoutMode.Reps}
          checked={form.mode === WorkoutMode.Reps}
          onChange={handleChangeMode}
        />
        Reps
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value={WorkoutMode.Timed}
          checked={form.mode === WorkoutMode.Timed}
          onChange={handleChangeMode}
        />
        Timed
      </label>
    </Row>
  );
};

export default ModeField;
