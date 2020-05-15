import React from 'react';
import { useSelector, useDispatch } from 'store';
// import { usedispatch } from 'context/ModalContext';
import { useMoveDispatch } from 'context/MoveContext';

import StyledAddMovementContainer from 'domain/ModalRouter/AddMovementModal/style';
import Button from 'components/Button';

// DELETE ME

const AddMovementContainer: React.FC<{}> = () => {
  // const dispatch = usedispatch();
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
