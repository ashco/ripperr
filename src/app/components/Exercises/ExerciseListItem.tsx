import { useState } from 'react';
import styled from 'styled-components';

import { Modal, DeleteModal } from '../Modal';

const ExerciseListItem = ({ exercise }: any) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const hide = () => setShowDeleteModal(false);
  const show = () => setShowDeleteModal(true);

  const modal = showDeleteModal ? <DeleteModal hide={hide} /> : null;

  return (
    <ExerciseListItemWrapper>
      <span>
        <strong>Exercise Name:</strong> {exercise.name}
        {/* TODO - Write delete logic */}
        <button onClick={show}>Delete</button>
        {/* TODO - Write edit logic */}
        <button>Edit</button>
      </span>
      {modal}
    </ExerciseListItemWrapper>
  );
};

const ExerciseListItemWrapper = styled.li`
  height: 200px;
  width: 400px;
  background: #eee;
  margin-bottom: 2rem;
`;

export default ExerciseListItem;
