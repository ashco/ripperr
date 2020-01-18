import React from 'react';

// import {} from '../../common/types';
import { WorkoutMode } from '../../common/enums';

const ModeField: React.FC<{
  mode: WorkoutMode;
  handleChange: (e: { target: { name: string; value: any } }) => void;
}> = ({ mode, handleChange }) => {
  return (
    <label htmlFor="mode">
      Mode
      <input
        type="radio"
        name="mode"
        value={WorkoutMode.Reps}
        checked={mode === WorkoutMode.Reps}
        onChange={handleChange}
      />
      Reps
      <br />
      <input
        type="radio"
        name="mode"
        value={WorkoutMode.Timed}
        checked={mode === WorkoutMode.Timed}
        onChange={handleChange}
      />
      Timed
      <br />
    </label>
  );
};

export default ModeField;
