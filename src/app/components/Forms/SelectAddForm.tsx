import React from 'react';
import styled from 'styled-components';

import { FormWrapper } from './styles';
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

const SelectAddFormWrapper = styled(FormWrapper)`
  width: ${(p) => p.theme.space[12]};
`;
// const SelectAddFormWrapper = styled.div`
//   margin: auto;
//   display: grid;
//   width: ${(p) => p.theme.space[12]};
//   max-width: 100%;
//   button {
//     margin: ${(p) => p.theme.space[0]} 0;
//   }
// `;

export default SelectAddForm;
