import React from 'react';
import styled from 'styled-components';

import { useModalDispatch } from '../../context/ModalContext';

import { ModalWrapper } from './styles';
import { Button } from '../Buttons';

const AddForm: React.FC<{}> = () => {
  const modalDispatch = useModalDispatch();

  function addArchetype(): void {
    modalDispatch({ type: 'MODAL_EDIT' });
  }
  function addExercise(): void {
    modalDispatch({ type: 'MODAL_EDIT' });
  }
  function addWorkout(): void {
    modalDispatch({ type: 'MODAL_EDIT' });
  }
  function closeModal(): void {
    modalDispatch({ type: 'MODAL_CLOSE' });
  }

  return (
    <AddModalWrapper>
      <Button onClick={addArchetype}>Add Archetype</Button>
      <Button onClick={addExercise}>Add Exercise</Button>
      <Button onClick={addWorkout}>Add Workout</Button>
      <Button className="cancel-btn" onClick={closeModal}>
        Cancel
      </Button>
    </AddModalWrapper>
  );
};

const AddModalWrapper = styled(ModalWrapper)`
  width: ${(p) => p.theme.space[12]};
  display: grid;
  gap: 0.5rem;
  .cancel-btn {
    margin-top: 2rem;
  }
`;

export default AddForm;
