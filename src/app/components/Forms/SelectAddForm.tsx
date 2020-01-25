import React from 'react';
import styled from 'styled-components';

import { Button } from '../Buttons';

const SelectAddForm: React.FC<{
  addExercise: () => void;
  addWorkout: () => void;
}> = ({ addExercise, addWorkout }) => {
  return (
    <SelectAddFormWrapper>
      <Button onClick={addExercise}>Add Exercise</Button>
      <Button onClick={addWorkout}>Add Workout</Button>
      <Button onClick={addWorkout}>Cancel</Button>
    </SelectAddFormWrapper>
  );
};

const SelectAddFormWrapper = styled.div`
  margin: auto;
  display: grid;
`;

export default SelectAddForm;
