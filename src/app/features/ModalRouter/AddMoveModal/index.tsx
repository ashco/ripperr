import React from 'react';

import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';

import Button from 'components/Button';
import AddMoveModalContainer from './style';

import ModalBackground from 'components/ModalBackground';

const AddMoveModal: React.FC<{
  setAddMoveType: any;
}> = ({ setAddMoveType }) => {
  const dispatch = useDispatch();

  function addTag(): void {
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
      <AddMoveModalContainer>
        <h1>Create Movement</h1>
        <div className="content">
          <div className="btn-container">
            <Button onClick={addTag}>Add Tag</Button>
            <Button onClick={addExercise}>Add Exercise</Button>
            <Button onClick={addWorkout}>Add Workout</Button>
          </div>
          <Button className="cancel-btn" onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </AddMoveModalContainer>
    </ModalBackground>
  );
};

export default AddMoveModal;
