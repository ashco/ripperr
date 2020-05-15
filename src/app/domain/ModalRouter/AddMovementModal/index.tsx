import React from 'react';

import { useSelector, useDispatch } from 'store';
import { useModalDispatch } from 'context/ModalContext';
import { useMoveDispatch } from 'context/MoveContext';

import AddMovementModalContainer from './style';
import Button from 'components/Button';

import ModalBackground from 'components/ModalBackground';
import ColorBarWrapper from 'components/ColorBarWrapper';

const AddMovementModal = () => {
  // const dispatch = useModalDispatch();
  const dispatch = useDispatch();
  const moveDispatch = useMoveDispatch();

  function addArchetype(): void {
    dispatch({ type: 'MODAL_EDIT' });
    moveDispatch({ type: 'MOVE_RESET_AR' });
  }
  function addExercise(): void {
    dispatch({ type: 'MODAL_EDIT' });
    moveDispatch({ type: 'MOVE_RESET_EX' });
  }
  function addWorkout(): void {
    dispatch({ type: 'MODAL_EDIT' });
    moveDispatch({ type: 'MOVE_RESET_WO' });
  }
  function closeModal(): void {
    dispatch({ type: 'MODAL_CLOSE' });
  }

  return (
    <ModalBackground>
      <ColorBarWrapper color="green">
        <AddMovementModalContainer width="28rem">
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
        </AddMovementModalContainer>
      </ColorBarWrapper>
    </ModalBackground>
  );
};

export default AddMovementModal;
