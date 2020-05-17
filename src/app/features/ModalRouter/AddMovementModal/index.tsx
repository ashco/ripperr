import React from 'react';

import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';

import AddMovementModalContainer from './style';
import Button from 'components/Button';

import ModalBackground from 'components/ModalBackground';
import ColorBarWrapper from 'components/ColorBarWrapper';

const AddMovementModal: React.FC<{
  setAddMoveType: any;
}> = ({ setAddMoveType }) => {
  const dispatch = useDispatch();

  function addArchetype(): void {
    dispatch(setModalMode({ modalMode: 'EDIT' }));
    setAddMoveType('TAG');
    // * might need to reset moves.active in redux store, but might not
    // moveDispatch({ type: 'MOVE_RESET_AR' });
  }
  function addExercise(): void {
    dispatch(setModalMode({ modalMode: 'EDIT' }));
    setAddMoveType('EXERCISE');
    // moveDispatch({ type: 'MOVE_RESET_EX' });
  }
  function addWorkout(): void {
    dispatch(setModalMode({ modalMode: 'EDIT' }));
    setAddMoveType('WORKOUT');
    // moveDispatch({ type: 'MOVE_RESET_WO' });
  }
  function closeModal(): void {
    dispatch(setModalMode({ modalMode: 'CLOSED' }));
    setAddMoveType(null);
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
