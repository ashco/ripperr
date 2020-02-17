import React from 'react';
import styled from 'styled-components';

import { ModalWrapper } from './styles';

// import { FormWrapper } from '../Forms/styles';
import ButtonRow from '../Forms/ButtonRow';
// import { Button } from '../Buttons';

import { useModalDispatch } from '../../context/ModalContext';

const DeleteModal: React.FC<{
  handleDelete?: () => void;
}> = ({ handleDelete }) => {
  const modalDispatch = useModalDispatch();

  function onDelete(): void {
    // handleDelete();
    modalDispatch({ type: 'MODAL_CLOSE' });
  }

  const btnConfig = {
    cancelBtn: {
      text: 'Cancel',
      onClick: (): void => modalDispatch({ type: 'MODAL_CLOSE' }),
    },
    actionBtn: {
      text: 'Delete',
      onClick: onDelete,
    },
  };

  return (
    <DeleteModalWrapper>
      <p>Do you want to delete this MOVEMENT?</p>
      <ButtonRow config={btnConfig} />
    </DeleteModalWrapper>
  );
};

const DeleteModalWrapper = styled(ModalWrapper)`
  display: grid;
  gap: 1rem;
  p {
    font-size: ${(p) => p.theme.font[3]};
  }
`;

export default DeleteModal;
