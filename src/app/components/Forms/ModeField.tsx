import React from 'react';

import { Row } from './FormStyles';

import { IHandleChange, IWorkoutFormValues } from '../../common/types';
import { WorkoutMode } from '../../common/enums';

const ModeField: React.FC<{
  form: IWorkoutFormValues;
  handleChange: (e: IHandleChange) => void;
}> = ({ form, handleChange }) => {
  // TODO Clear out config property + set to default for new mode
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
