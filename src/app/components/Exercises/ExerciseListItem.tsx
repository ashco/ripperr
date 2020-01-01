// import { useState } from 'react';
import styled from 'styled-components';
import { DeleteButton } from '../Buttons';

const ExerciseListItem = ({ exercise }: any) => {
  // const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const hide = (): void => setShowDeleteModal(false);
  // const show = (): void => setShowDeleteModal(true);

  // const modal = showDeleteModal ? <DeleteModal hide={hide} /> : null;

  return (
    <ExerciseListItemWrapper>
      <span>
        <strong>Exercise Name:</strong> {exercise.name}
        <DeleteButton
          text="Do you want to delete this?"
          handleDelete={() => console.log('Hi mom')}
        />
        {/* TODO - Write edit logic */}
        <button>Edit</button>
      </span>
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
