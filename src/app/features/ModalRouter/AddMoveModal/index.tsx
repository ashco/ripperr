import React from 'react';

import { useDispatch, batch } from 'store';
import { setModalMode } from 'store/ui';
import { clearActiveMove } from 'store/moves';

import Button from 'components/Button';
import AddMoveModalContainer from './style';

import ModalBackground from 'components/ModalBackground';

import { MovementType } from 'types';

const AddMoveModal: React.FC<{
  setAddMoveType: React.Dispatch<React.SetStateAction<MovementType | null>>;
}> = ({ setAddMoveType }) => {
  const dispatch = useDispatch();

  function addTag(): void {
    dispatch(setModalMode({ modalMode: 'EDIT' }));
    setAddMoveType('TAG');
  }

  function addExercise(): void {
    dispatch(setModalMode({ modalMode: 'EDIT' }));
    setAddMoveType('EXERCISE');
  }

  function addWorkout(): void {
    dispatch(setModalMode({ modalMode: 'EDIT' }));
    setAddMoveType('WORKOUT');
  }

  function closeModal(): void {
    batch(() => {
      dispatch(setModalMode({ modalMode: null }));
      // dispatch(clearActiveMove());
    });
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
