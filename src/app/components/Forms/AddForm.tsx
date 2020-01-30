import React from 'react';
import styled from 'styled-components';

import { FormWrapper } from './styles';
import { Button } from '../Buttons';

const AddForm: React.FC<{
  addArchetype: () => void;
  addExercise: () => void;
  addWorkout: () => void;
  hide: () => void;
}> = ({ addArchetype, addExercise, addWorkout, hide }) => {
  return (
    <AddFormWrapper>
      <Button onClick={addArchetype}>Add Archetype</Button>
      <Button onClick={addExercise}>Add Exercise</Button>
      <Button onClick={addWorkout}>Add Workout</Button>
      <Button onClick={hide}>Cancel</Button>
    </AddFormWrapper>
  );
};

const AddFormWrapper = styled(FormWrapper)`
  width: ${(p) => p.theme.space[12]};
`;
// const AddFormWrapper = styled.div`
//   margin: auto;
//   display: grid;
//   width: ${(p) => p.theme.space[12]};
//   max-width: 100%;
//   button {
//     margin: ${(p) => p.theme.space[0]} 0;
//   }
// `;

export default AddForm;
