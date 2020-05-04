import React from 'react';

import { useModalDispatch } from '@/context/ModalContext';
import { useMoveDispatch } from '@/context/MoveContext';

import StyledAddMovementContainer from './style';
import Button from '@/components/Button';

const AddMovementContainer: React.FC<{}> = () => {
  const modalDispatch = useModalDispatch();
  const moveDispatch = useMoveDispatch();

  function addArchetype(): void {
    modalDispatch({ type: 'MODAL_ADD' });
    moveDispatch({ type: 'MOVE_RESET_AR' });
  }
  function addExercise(): void {
    modalDispatch({ type: 'MODAL_ADD' });
    moveDispatch({ type: 'MOVE_RESET_EX' });
  }
  function addWorkout(): void {
    modalDispatch({ type: 'MODAL_ADD' });
    moveDispatch({ type: 'MOVE_RESET_WO' });
  }
  function closeModal(): void {
    modalDispatch({ type: 'MODAL_CLOSE' });
  }

  return (
    <StyledAddMovementContainer>
      <div className="btn-container">
        <Button onClick={addArchetype}>Add Archetype</Button>
        <Button onClick={addExercise}>Add Exercise</Button>
        <Button onClick={addWorkout}>Add Workout</Button>
      </div>
      <Button className="cancel-btn" onClick={closeModal}>
        Cancel
      </Button>
    </StyledAddMovementContainer>
  );
};

export default AddMovementContainer;
