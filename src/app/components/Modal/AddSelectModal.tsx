import React from 'react';
import styled from 'styled-components';

import { useModalDispatch } from '../../context/ModalContext';
import { useMoveDispatch } from '../../context/MoveContext';

import { ModalWrapper } from './styles';
import Button from '../Button';

const AddSelectModal: React.FC<{}> = () => {
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
    <AddSelectModalWrapper>
      <Button onClick={addArchetype}>Add Archetype</Button>
      <Button onClick={addExercise}>Add Exercise</Button>
      <Button onClick={addWorkout}>Add Workout</Button>
      <Button className="cancel-btn" onClick={closeModal}>
        Cancel
      </Button>
    </AddSelectModalWrapper>
  );
};

const AddSelectModalWrapper = styled(ModalWrapper)`
  width: ${(p) => p.theme.space[12]};
  display: grid;
  gap: 0.5rem;
  .cancel-btn {
    margin-top: 2rem;
  }
`;

export default AddSelectModal;
