import React from 'react';
import styled from 'styled-components';

const SelectAddForm: React.FC<{
  addExercise: () => void;
  addWorkout: () => void;
}> = ({ addExercise, addWorkout }) => {
  return (
    <SelectAddFormWrapper>
      <button onClick={addExercise}>Add Exercise</button>
      <button onClick={addWorkout}>Add Workout</button>
    </SelectAddFormWrapper>
  );
};

const SelectAddFormWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  button {
    font-size: 2rem;
    margin: 0.25rem;
    padding: 0.5rem;
  }
`;

export default SelectAddForm;
