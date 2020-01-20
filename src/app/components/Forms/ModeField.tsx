import React from 'react';
import styled from 'styled-components';

import { Row } from './FormStyles';

import { IWorkoutFormValues } from '../../common/types';
import { WorkoutMode } from '../../common/enums';

const ModeField: React.FC<{
  form: IWorkoutFormValues;
  setForm: (form: IWorkoutFormValues) => void;
  handleChange: (e: any, property: string) => void;
}> = ({ form, setForm, handleChange }) => {
  // function handleChangeMode(e: { target: { name: string; value: any } }) {
  //   handleChange(e);

  //   // TODO Clear out config property + set to default for new mode
  //   const newMoves = form.movements.map((move) => ({
  //     id: move.id,
  //     config: {},
  //   }));
  //   const newForm = { ...form, movements: newMoves };
  //   // setForm(newForm);
  // }

  return (
    <>
      <Row>
        <label>
          <input
            type="radio"
            value={WorkoutMode.Reps}
            checked={form.mode === WorkoutMode.Reps}
            onChange={(e) => handleChange(e, 'mode')}
          />
          Reps
        </label>
        <label>
          <input
            type="radio"
            value={WorkoutMode.Timed}
            checked={form.mode === WorkoutMode.Timed}
            onChange={(e) => handleChange(e, 'mode')}
          />
          Timed
        </label>
      </Row>
      <Row>
        {form.mode === WorkoutMode.Reps && <p>Reps Mode Config</p>}
        {form.mode === WorkoutMode.Timed && <p>Timed Mode Config</p>}
      </Row>
    </>
  );
};

const TimedModeConfigFields = () => {
  return (
    <label>
      <input type="number" />
    </label>
  );
};

export default ModeField;
