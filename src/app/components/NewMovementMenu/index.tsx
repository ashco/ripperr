import React from 'react';

import { useModalDispatch } from 'context/ModalContext';
import { useMoveDispatch } from 'context/MoveContext';

import NewMovementMenuContainer from './style';
import Button from 'components/Button';

import ModalBackground from 'domain/Modal/ModalBackground';

const NewMovementMenu = () => {
  const modalDispatch = useModalDispatch();
  const moveDispatch = useMoveDispatch();

  function addArchetype(): void {
    modalDispatch({ type: 'MODAL_EDIT' });
    moveDispatch({ type: 'MOVE_RESET_AR' });
  }
  function addExercise(): void {
    modalDispatch({ type: 'MODAL_EDIT' });
    moveDispatch({ type: 'MOVE_RESET_EX' });
  }
  function addWorkout(): void {
    modalDispatch({ type: 'MODAL_EDIT' });
    moveDispatch({ type: 'MOVE_RESET_WO' });
  }
  function closeModal(): void {
    modalDispatch({ type: 'MODAL_CLOSE' });
  }

  return (
    <ModalBackground>
      <NewMovementMenuContainer>
        <h1 className="header">Create Movement</h1>
        <div className="content">
          <div className="btn-container">
            <Button onClick={addArchetype}>Add Archetype</Button>
            <Button onClick={addExercise}>Add Exercise</Button>
            <Button onClick={addWorkout}>Add Workout</Button>
          </div>
          <Button className="cancel-btn" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </NewMovementMenuContainer>
    </ModalBackground>
  );
};

export default NewMovementMenu;
