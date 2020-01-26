import React from 'react';
import styled from 'styled-components';

import { Button } from '../Buttons';

const SelectAddForm: React.FC<{
  addExercise: () => void;
  addWorkout: () => void;
  hide: () => void;
}> = ({ addExercise, addWorkout, hide }) => {
  return (
    <SelectAddFormWrapper>
      <Button onClick={addExercise}>Add Exercise</Button>
      <Button onClick={addWorkout}>Add Workout</Button>
      <Button onClick={hide}>Cancel</Button>
    </SelectAddFormWrapper>
  );
};

const SelectAddFormWrapper = styled.div`
  margin: auto;
  display: grid;
`;

export default SelectAddForm;
