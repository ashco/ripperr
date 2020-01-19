import React from 'react';
import styled from 'styled-components';

import { Row } from './FormStyles';

// import {} from '../../common/types';
import { WorkoutMode } from '../../common/enums';

const ModeField: React.FC<{
  mode: WorkoutMode;
  handleChange: (e: { target: { name: string; value: any } }) => void;
}> = ({ mode, handleChange }) => {
  return (
    <Row>
      <label htmlFor="mode">
        <input
          type="radio"
          name="mode"
          value={WorkoutMode.Reps}
          checked={mode === WorkoutMode.Reps}
          onChange={handleChange}
        />
        Reps
        <input
          type="radio"
          name="mode"
          value={WorkoutMode.Timed}
          checked={mode === WorkoutMode.Timed}
          onChange={handleChange}
        />
        Timed
      </label>
    </Row>
  );
};

export default ModeField;
