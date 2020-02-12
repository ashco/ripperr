import React from 'react';
import styled from 'styled-components';

import { ModalWrapper } from './styles';

import { FormWrapper } from '../Forms/styles';
import ButtonRow from '../Forms/ButtonRow';
import { Button } from '../Buttons';

const DeleteModal: React.FC<{
  text: string;
  hide: () => void;
  handleDelete: () => void;
}> = ({ text, hide, handleDelete }) => {
  function onDelete() {
    handleDelete();
    hide();
  }

  const cancelBtn = {
    onClick: hide,
    text: 'Cancel',
  };
  const actionBtn = {
    onClick: onDelete,
    text: 'Delete',
  };

  return (
    <DeleteModalWrapper>
      <p>{text}</p>
      <ButtonRow cancelBtn={cancelBtn} actionBtn={actionBtn} />
    </DeleteModalWrapper>
  );
};

const DeleteModalWrapper = styled(ModalWrapper)`
  display: grid;
  /* grid-template-rows: auto auto auto; */
  gap: 1rem;
  p {
    font-size: ${(p) => p.theme.font[3]};
    /* padding-bottom: ${(p) => p.theme.space[2]}; */
  }
`;

export default DeleteModal;
